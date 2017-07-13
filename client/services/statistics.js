import mean from 'lodash/mean';
import sum from 'lodash/sum';
import round from 'lodash/round';

export const getPullRequestsStatistics = (pullRequests, users) => {
    const result = {
        users: {},
        state: {
            openCount: 0,
            closedCount: 0,
            mergedCount: 0,
            total: 0
        },
    };

    const timesToMerge = [];

    pullRequests.forEach(pr => {
        incrementUserCreatedPR(result.users, pr);
        incrementState(result.state, pr);
        addTimeToMerge(timesToMerge, pr);
    });

    result.timeToMerge = calculateTimeToMerge(timesToMerge);

    return result;
};

const incrementUserCreatedPR = (userStates, pr) => {
    if (userStates[pr.user.login]) {
        userStates[pr.user.login].pullRequestsCreated++;
    } else {
        userStates[pr.user.login] = {
            pullRequestsCreated: 1,
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

const addTimeToMerge = (times, pr) => {
    if (pr.merged) {
        const createdDate = new Date(pr.created_at);
        const mergedDate = new Date(pr.merged_at);
        const milliseconds = mergedDate.getTime() - createdDate.getTime();
        times.push(Math.floor(milliseconds / 1000));
    }
};

const calculateTimeToMerge = (secondsToMerge) => {
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
