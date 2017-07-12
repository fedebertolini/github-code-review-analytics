import { authorizedGetData } from './api';

export const getRepositories = (org, search = '') =>
    authorizedGetData(`/search/repositories?q=user:${org} ${search}`)
    .then(result => result.items);
