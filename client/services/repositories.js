import { authorizedGetData } from './api';

export const getRepositories = (org, search = '') =>
    authorizedGetData(`/search/repositories?q=user:${org} ${search}&&per_page=10`)
    .then(result => result.items);
