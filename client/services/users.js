import { authorizedGetData } from './api';

export const getLoggedInUser = () => authorizedGetData('/user');

export const getUsersOrganizations = () => authorizedGetData(`/user/orgs`);
