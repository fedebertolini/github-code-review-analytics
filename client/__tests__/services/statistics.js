import { getPullRequestsStatistics } from '../../services/statistics';
import prs from '../mocks/pull-requests/janusMappedPRs.json';

describe('statistics service', () => {
    it('should return the user statistics', () => {
        const stats = getPullRequestsStatistics(prs);

        expect(stats.users).toEqual({
            bastiankoetsier: {
                pullRequestsCreated: 2,
                totalCommits: 3
            },
            italolelis: {
                pullRequestsCreated: 41,
                totalCommits: 484
            },
            kieranajp: {
                pullRequestsCreated: 5,
                totalCommits: 6,
            },
            vgarvardt: {
                pullRequestsCreated: 52,
                totalCommits: 78,
            },
        });
    });

    it('should return the pr state statistics', () => {
        const stats = getPullRequestsStatistics(prs);

        expect(stats.state).toEqual({
            openCount: 1,
            closedCount: 3,
            mergedCount: 96,
            total: 100,
        });
    });
});
