import flatten from 'lodash/flatten';
import { authorizedGraphQL } from './api';

export const getRepositoriesPullRequests = (organization, repositories, filters = {}) =>
    Promise.all(repositories.map(repo => getRepositoryPullRequests(organization, repo, filters)))
    .then(result => flatten(result));

export const getRepositoryPullRequests = async (organization, repository, filters = {}) => {
    const searchQuery = buildQueryParameter(organization, repository, filters);

    let pullRequests = [];
    let allPRsFetched = false;
    let endCursor = null;

    while (!allPRsFetched) {
        const graphQLQuery = pullRequestGraphQLQuery(searchQuery, 100, endCursor);
        const result = await authorizedGraphQL('/graphql', { query: graphQLQuery });
        if (result.data.errors) {
            throw new Error(result.data.errors);
        }
        pullRequests = pullRequests.concat(mapGraphQLResult(result.data));
        endCursor = result.data.data.search.pageInfo.endCursor;
        allPRsFetched = pullRequests.length >= result.data.data.search.issueCount;
    }

    return pullRequests;
};

const buildQueryParameter = (organization, repository, filters = {}) => {
    let searchQuery = `repo:${organization}/${repository} type:pr`;

    if (filters.authors && filters.authors.length) {
        searchQuery += filters.authors.map(author => ` author:${author}`).join('');
    }
    if (filters.createdFrom) {
        searchQuery += ` created:>=${filters.createdFrom}`;
    }
    if (filters.createdTo) {
        searchQuery += ` created:<=${filters.createdTo}`;
    }
    return searchQuery;
};

const pullRequestGraphQLQuery = (searchQuery, first, after = null) =>
`{
    search(query: "${searchQuery}", type: ISSUE, first: ${first}, after: ${after ? `"${after}"` : 'null'}) {
        issueCount
        pageInfo {
          endCursor
        }
        edges {
          cursor
          node {
            ... on PullRequest {
              number
              createdAt
              mergedAt
              state
              author {
                login
              }
              commits(first: 1) {
                totalCount
              }
              comments(first: 100) {
                totalCount
                nodes {
                  createdAt
                  author {
                    login
                  }
                }
              }
            }
          }
        }
    }
}`;

export const mapGraphQLResult = (result) => {
    return result.data.search.edges.map(edge => ({
        author: edge.node.author.login,
        number: edge.node.number,
        createdAt: edge.node.createdAt,
        mergedAt: edge.node.mergedAt,
        state: edge.node.state,
        totalCommits: edge.node.commits.totalCount,
        totalComments: edge.node.comments.totalCount,
        comments: edge.node.comments.nodes.map(comment => ({
            createdAt: comment.createdAt,
            author: comment.author.login,
        }))
    }));
};
