import mean from 'lodash/mean';
import sum from 'lodash/sum';
import round from 'lodash/round';
import flow from 'lodash/flow';
import compact from 'lodash/compact';
import uniq from 'lodash/uniq';
import { getDateHoursDiff } from '../utils/date';

export const getPullRequestsStatistics = (pullRequests) => ({
    total: getStats(pullRequests),
    slices: {
        user: getUserSliceStats(pullRequests),
        day: getDaySliceStats(pullRequests),
        repository: getRepositorySliceStats(pullRequests),
    },
});

const getStats = prs => ({
    pullRequest: getPullRequestStats(prs),
    timeToMerge: getTimeToMergeStats(prs),
    timeToFirstComment: getTimeToFirstCommentStats(prs),
    totalCommits: getTotalCommits(prs),
});

const getUserSliceStats = prs => {
    const users = uniq(prs.map(pr => pr.author));
    return users.reduce((usersStats, user) => Object.assign(usersStats, {
        [user]: getUserStats(user)(prs),
    }), {});
};

const getRepositorySliceStats = prs => {
    const repos = uniq(prs.map(pr => pr.repository));
    return repos.reduce((reposStats, repository) => Object.assign(reposStats, {
        [repository]: getRepositoryStats(repository)(prs),
    }), {});
};

const getTotalCommits = prs => sum(prs.map(pr => pr.totalCommits));

const getDaySliceStats = prs => [0, 1, 2, 3, 4, 5, 6].map(day => getDayStats(day)(prs));

const getPullRequestStats = prs => prs.reduce((result, pr) => Object.assign(result, {
    total: (result.total || 0) + 1,
    open: (result.open || 0) + (pr.state === 'OPEN' ? 1 : 0),
    closed: (result.closed || 0) + (pr.state === 'CLOSED' ? 1 : 0),
    merged: (result.merged || 0) + (pr.state === 'MERGED' ? 1 : 0),
}), {});

const mergedFilter = prs => prs.filter(pr => pr.state === 'MERGED');

const userFilter = user => prs => prs.filter(pr => pr.author === user);
const getUserStats = user => flow([userFilter(user), getStats]);

const dayFilter = day => prs => prs.filter(pr => day === (new Date(pr.createdAt)).getDay());
const getDayStats = day => flow([dayFilter(day), getStats]);

const repositoryFilter = repository => prs => prs.filter(pr => pr.repository === repository);
const getRepositoryStats = repository => flow([repositoryFilter(repository), getStats]);

const findFirstComment = pr => pr.comments.find(comment => comment.author !== pr.author);

const timeToFirstCommentMap = prs => prs.map(pr => {
    const firstComment = findFirstComment(pr);
    if (!firstComment) {
        return null;
    }
    return getDateHoursDiff(pr.createdAt, firstComment.createdAt);
});

const timeToMergeMap = prs => prs.map(pr => getDateHoursDiff(pr.createdAt, pr.mergedAt));

const getValueListStats = (values) => {
    const meanValue = values.length ? mean(values) : 0;
    const deviationValue = values.length ? standardDeviation(values, meanValue) : 0;
    return {
        values: roundValues(values),
        mean: round(meanValue, 2),
        standardDeviation: round(deviationValue, 2),
    };
};

const standardDeviation = (values, meanValue) => {
    const diff = values.map(v => Math.pow(v - meanValue, 2));
    return Math.sqrt(sum(diff) / diff.length);
};

const roundValues = values => values.map(value => round(value, 2));

const getTimeToMergeStats = flow([mergedFilter, timeToMergeMap, getValueListStats]);
const getTimeToFirstCommentStats = flow([timeToFirstCommentMap, compact, getValueListStats]);
