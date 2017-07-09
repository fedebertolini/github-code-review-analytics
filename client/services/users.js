import { authorizedGet } from './api';

export const getLoggedInUser = () => authorizedGet('/user');

export const getUsersOrganizations = () => authorizedGet(`/user/orgs`);
