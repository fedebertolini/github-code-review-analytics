import mean from 'lodash/mean';
import sum from 'lodash/sum';
import round from 'lodash/round';
import flow from 'lodash/flow';
import compact from 'lodash/compact';
import uniq from 'lodash/uniq';

export const getPullRequestsStatistics = (pullRequests) => {
    const result = {
        total: getStats(pullRequests),
        slices: {
            user: getUserSliceStats(pullRequests),
            day: getDaySliceStats(pullRequests),
        },
    };

    return result;
};

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

const getTotalCommits = prs => sum(prs.map(pr => pr.totalCommits));

const getDaySliceStats = prs => [0, 1, 2, 3, 4, 5, 6].map(day => getDayStats(day)(prs));

const getPullRequestStats = prs => prs.reduce((result, pr) => {
    return Object.assign(result, {
        total: (result.total || 0) + 1,
        open: (result.open || 0) + (pr.state === 'OPEN' ? 1 : 0),
        closed: (result.closed || 0) + (pr.state === 'CLOSED' ? 1 : 0),
        merged: (result.merged || 0) + (pr.state === 'MERGED' ? 1 : 0),
    })
}, {});

const mergedFilter = prs => prs.filter(pr => pr.state === 'MERGED');

const userFilter = user => prs => prs.filter(pr => pr.author === user);
const getUserStats = user => flow([userFilter(user), getStats]);

const dayFilter = day => prs => prs.filter(pr => day === (new Date(pr.createdAt)).getDay());
const getDayStats = day => flow([dayFilter(day), getStats]);

const findFirstComment = pr => pr.comments.find(comment => comment.author !== pr.author);

const timeToFirstCommentMap = prs => prs.map(pr => {
    const firstComment = findFirstComment(pr);
    if (!firstComment) {
        return null;
    }
    const prCreatedDate = new Date(pr.createdAt);
    const firstCommentDate = new Date(firstComment.createdAt);
    const milliseconds = firstCommentDate.getTime() - prCreatedDate.getTime();
    return round(milliseconds / 3600000, 2);
});

const timeToMergeMap = prs => prs.map(pr => {
    const createdDate = new Date(pr.createdAt);
    const mergedDate = new Date(pr.mergedAt);
    const milliseconds = mergedDate.getTime() - createdDate.getTime();
    return round(milliseconds / 3600000, 2);
});

const getValueListStats = (values) => {
    const meanValue = mean(values);
    const deviationValue = deviation(values, meanValue);
    return {
        values: roundValues(values),
        mean: round(meanValue, 2),
        deviation: round(deviationValue, 2),
    };
};

const deviation = (values, meanValue) => {
    const diff = values.map(v => Math.abs(v - meanValue));
    return sum(diff) / diff.length;
};

const roundValues = values => values.map(value => round(value, 2));

const getTimeToMergeStats = flow([mergedFilter, timeToMergeMap, getValueListStats]);
const getTimeToFirstCommentStats = flow([timeToFirstCommentMap, compact, getValueListStats]);
