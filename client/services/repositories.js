import { authorizedGet } from './api';

export const getRepositories = (org, search = '') =>
    authorizedGet(`/search/repositories?q=user:${org} ${search}`)
    .then(result => result.items);
