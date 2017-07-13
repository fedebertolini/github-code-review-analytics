import { getPullRequestsStatistics } from '../../services/statistics';
import webpack1 from '../mocks/pull-requests/webpack-1.json';
import webpack36 from '../mocks/pull-requests/webpack-36.json';
import webpack683 from '../mocks/pull-requests/webpack-683.json';
import webpack3409 from '../mocks/pull-requests/webpack-3409.json';
import webpack3427 from '../mocks/pull-requests/webpack-3427.json';
import webpack4201 from '../mocks/pull-requests/webpack-4201.json';
import webpack4202 from '../mocks/pull-requests/webpack-4202.json';

describe('statistics service', () => {
    it('should return the user statistics', () => {
        const prs = [webpack1, webpack36, webpack683, webpack3409, webpack3427, webpack4201, webpack4202];
        const users = ['fedebertolini', 'sokra', 'tuures'];
        const stats = getPullRequestsStatistics(prs, users);

        expect(stats.users).toEqual({
            fedebertolini: {
                pullRequestsCreated: 2,
            },
            sokra: {
                pullRequestsCreated: 2,
            },
            tuures: {
                pullRequestsCreated: 1,
            }
        });
    });

    it('should return the pr state statistics', () => {
        const prs = [webpack1, webpack36, webpack683, webpack3409, webpack3427, webpack4201, webpack4202];
        const users = ['fedebertolini', 'sokra', 'tuures'];
        const stats = getPullRequestsStatistics(prs, users);

        expect(stats.state).toEqual({
            openCount: 1,
            closedCount: 2,
            mergedCount: 4,
            total: 7,
        });
    });
});
