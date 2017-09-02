import flatten from 'lodash/flatten';
import orderBy from 'lodash/orderBy';
import reverse from 'lodash/reverse';
import { authorizedGetData } from './api';

export const getContributors = async (org, repositories) => {
    const result = await Promise.all(repositories.map(repo => getContributorsByRepo(org, repo)));

    const contributorsDictionary = flatten(result)
        .map(contributor => Object.assign(contributor.author, {
            contributions: contributor.total
        }))
        .reduce((contributors, contributor) => {
            if (contributors[contributor.id]) {
                contributors[contributor.id].contributions += contributor.total;
            } else {
                contributors[contributor.id] = contributor;
            }
            return contributors;
        }, {});

    return reverse(orderBy(Object.values(contributorsDictionary), 'contributions'));
};

const getContributorsByRepo = async (org, repo) => {
    return authorizedGetData(`/repos/${org}/${repo}/stats/contributors`);
};
