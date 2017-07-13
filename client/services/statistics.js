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

    users.forEach(user => {
        result.users[user] = {
            pullRequestsCreated: 0,
        };
    });

    pullRequests.forEach(pr => {
        incrementUserCreatedPR(result.users, pr);
        incrementState(result.state, pr);
    });

    return result;
};

const incrementUserCreatedPR = (userStates, pr) => {
    userStates[pr.user.login].pullRequestsCreated++;
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
