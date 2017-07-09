import Cookies from 'js-cookie';

const COOKIE_NAME = process.env.REACT_APP_ACCESS_TOKEN_COOKIE;

export const getLoginUrl = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirect = window.location.origin + '/login/callback';
    const scopes = 'read:user,repo,read:org';
    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}&scope=${scopes}`;
}

export const getAccessToken = () => Cookies.get(COOKIE_NAME);

export const hasAccessToken = () => !!getAccessToken();

export const invalidateAccessToken = () => Cookies.remove(COOKIE_NAME);
