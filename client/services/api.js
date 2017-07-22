import { get, post } from 'axios';
import flatten from 'lodash/flatten';
import parseHeaderLinks from 'parse-link-header';
import { getAccessToken } from './auth';

const host = 'https://api.github.com';

export const authorizedGetData = (url, params) =>
    authorizedGet(url, params).then(result => result.data);

export const authorizedGet = (url, params) => {
    return get(`${host}${url}`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        params,
    });
};

export const authorizedGraphQL = (url, data) => {
    return post(`${host}${url}`, data, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/graphql'
        },
    });
};

export const getAllPages = async (url) => {
    const firstPageResults = await authorizedGet(url);
    let items = firstPageResults.data.items;

    const links = parseHeaderLinks(firstPageResults.headers.link || '');
    if (links && links.last) {
        const lastPage = parseInt(links.last.page, 10);
        if (lastPage > 1) {
            const promises = [];
            for (let i = 2; i <= lastPage; i++) {
                promises.push(authorizedGetData(`${url}&page=${i}`).then(data => data.items));
            }
            const otherPagesResult = await Promise.all(promises);
            items = items.concat(flatten(otherPagesResult));
        }
    }

    return items;
};
