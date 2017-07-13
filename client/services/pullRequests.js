import flatten from 'lodash/flatten';
import { getAllPages, authorizedGetData } from './api';

export const getRepositoriesPullRequests = (organization, repositories, filters = {}) =>
    Promise.all(repositories.map(repo => getRepositoryPullRequests(organization, repo, filters)))
    .then(result => flatten(result));

export const getRepositoryPullRequests = async (organization, repository, filters = {}) => {
    let url = `/search/issues?per_page=100&q=repo:${organization}/${repository}+type:pr+`;
    if (filters.authors && filters.authors.length) {
        url += filters.authors.map(author => `author:${author}+`).join('');
    }
    if (filters.createdFrom) {
        url += `created:>=${filters.createdFrom}+`;
    }
    if (filters.createdTo) {
        url += `created:<=${filters.createdTo}+`;
    }

    const basicPRInfoList = await getAllPages(url);
    return Promise.all(basicPRInfoList.map(pr => {
        return authorizedGetData(`/repos/${organization}/${repository}/pulls/${pr.number}`);
    }))
};
