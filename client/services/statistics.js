import mean from 'lodash/mean';
import sum from 'lodash/sum';
import round from 'lodash/round';
import flatten from 'lodash/flatten';

export const getPullRequestsStatistics = (pullRequests) => {
    const result = {
        users: {},
        state: {
            openCount: 0,
            closedCount: 0,
            mergedCount: 0,
            total: 0
        },
    };

    const timesToMergeByDay = [[], [], [], [], [], [], []];

    pullRequests.forEach(pr => {
        incrementUserCreatedPR(result.users, pr);
        incrementState(result.state, pr);

        if (pr.merged) {
            var dateCreated = new Date(pr.created_at);
            timesToMergeByDay[dateCreated.getDay()].push(getTimeToMerge(pr));
        }
    });

    result.timeToMerge = {
        total: calculateTimeToMergeStats(flatten(timesToMergeByDay)),
        byDay: [0, 1, 2, 3, 4, 5, 6].map(day => {
            return calculateTimeToMergeStats(timesToMergeByDay[day]);
        }),
    };

    return result;
};

const incrementUserCreatedPR = (userStates, pr) => {
    if (userStates[pr.user.login]) {
        userStates[pr.user.login].pullRequestsCreated++;
        userStates[pr.user.login].totalAdditions += pr.additions;
        userStates[pr.user.login].totalDeletions += pr.deletions;
        userStates[pr.user.login].totalCommits += pr.commits;
    } else {
        userStates[pr.user.login] = {
            pullRequestsCreated: 1,
            totalAdditions: pr.additions,
            totalDeletions: pr.deletions,
            totalCommits: pr.commits,
        };
    }
};

const incrementState = (state, pr) => {
    state.total++;
    if (pr.state === 'open') {
        state.openCount++;
    } else if (pr.merged) {
        state.mergedCount++;
    } else if (pr.state === 'closed') {
        state.closedCount++;
    } else {
        console.log(`unknown status ${pr.state}`);
    }
};

const getTimeToMerge = (pr) => {
    if (pr.merged) {
        const createdDate = new Date(pr.created_at);
        const mergedDate = new Date(pr.merged_at);
        const milliseconds = mergedDate.getTime() - createdDate.getTime();
        return Math.floor(milliseconds / 1000);
    }
    return 0;
};

const calculateTimeToMergeStats = (secondsToMerge) => {
    if (!secondsToMerge.length) {
        return {};
    }
    const meanTime = mean(secondsToMerge);
    const meanDeviation = deviation(secondsToMerge, meanTime);

    return {
        timesHours: secondsToMerge.map(v => round(v / 3600, 2)),
        meanHours: round(meanTime / 3600, 2),
        meanDeviationHours: round(meanDeviation / 3600, 2)
    };
};

const deviation = (values, meanValue) => {
    const diff = values.map(v => Math.abs(v - meanValue));
    return sum(diff) / diff.length;
};
