import { get } from 'axios';
import { getAuthorizationHeader } from './auth';

const host = 'https://api.github.com';



export const getLoggedInUser = () => {
    const url = `${host}/user`;
    return get(url, {
        headers: {
            Authorization: getAuthorizationHeader(),
        },
    })
    .then(result => result.data);
}
