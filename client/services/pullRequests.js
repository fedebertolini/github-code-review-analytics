import flatten from 'lodash/flatten';
import { getAllPages } from './api';

export const getRepositoriesPullRequests = (organization, repositories, filters = {}) =>
    Promise.all(repositories.map(repo => getRepositoryPullRequests(organization, repo, filters)))
    .then(result => flatten(result));

export const getRepositoryPullRequests = async (organization, repository, filters = {}) => {
    let url = `/search/issues?per_page=100&q=repo:${organization}/${repository}+type:pr+`;
    if (filters.involves && filters.involves.length) {
        url += filters.involves.map(involve => `involves:${involve}+`).join('');
    }
    if (filters.createdFrom) {
        url += `created:>=${filters.createdFrom}+`;
    }
    if (filters.createdTo) {
        url += `created:<=${filters.createdTo}+`;
    }

    return getAllPages(url);
};
