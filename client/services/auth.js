import Cookies from 'js-cookie';

const COOKIE_NAME = process.env.REACT_APP_ACCESS_TOKEN_COOKIE;

export const getAccessToken = () => Cookies.get(COOKIE_NAME);

export const hasAccessToken = () => !!getAccessToken();

export const invalidateAccessToken = () => Cookies.remove(COOKIE_NAME);

export const getAuthorizationHeader = () => `Bearer ${getAccessToken()}`;
