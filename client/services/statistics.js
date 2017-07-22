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
            var dateCreated = new Date(pr.createdAt);
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
    if (userStates[pr.author]) {
        userStates[pr.author].pullRequestsCreated++;
        userStates[pr.author].totalCommits += pr.totalCommits;
    } else {
        userStates[pr.author] = {
            pullRequestsCreated: 1,
            totalCommits: pr.totalCommits,
        };
    }
};

const incrementState = (state, pr) => {
    state.total++;
    if (pr.state === 'OPEN') {
        state.openCount++;
    } else if (pr.state === 'MERGED') {
        state.mergedCount++;
    } else if (pr.state === 'CLOSED') {
        state.closedCount++;
    } else {
        console.log(`unknown status ${pr.state}`);
    }
};

const getTimeToMerge = (pr) => {
    if (pr.state === 'MERGED') {
        const createdDate = new Date(pr.createdAt);
        const mergedDate = new Date(pr.mergedAt);
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
