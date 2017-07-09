import { get } from 'axios';
import { getAccessToken } from './auth';

const host = 'https://api.github.com';

export const authorizedGet = (url, params) => {
    return get(`${host}${url}`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        params,
    })
    .then(result => result.data);
}
