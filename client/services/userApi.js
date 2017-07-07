import { get } from 'axios';

export const getUsers = () => get('/api/users/').then(result => result.data);
