import flatten from 'lodash/flatten';
import uniqBy from 'lodash/uniqBy';
import { authorizedGetData } from './api';

export const getContributors = async (org, repositories) => {
    const result = await Promise.all(repositories.map(repo => getContributorsByRepo(org, repo)));
    const users = flatten(result).map(contributor => contributor.author);
    return uniqBy(users, user => user.id);
};

const getContributorsByRepo = async (org, repo) => {
    return authorizedGetData(`/repos/${org}/${repo}/stats/contributors`);
};
