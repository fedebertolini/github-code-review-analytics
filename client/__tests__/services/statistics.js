import uniq from 'lodash/uniq';
import { getPullRequestsStatistics } from '../../services/statistics';
import prs from '../mocks/pull-requests/janusMappedPRs.json';

describe('statistics service', () => {
    const stats = getPullRequestsStatistics(prs);
    const users = uniq(prs.map(pr => pr.author));

    it('should return the total pull request statistics', () => {
        expect(stats.total.pullRequest.total).toBe(100);
        expect(stats.total.pullRequest.open).toBe(1);
        expect(stats.total.pullRequest.closed).toBe(3);
        expect(stats.total.pullRequest.merged).toBe(96);
    });

    it('should return the total time to merge statistics', () => {
        expect(stats.total.timeToMerge.values.length).toBe(stats.total.pullRequest.merged);
        expect(stats.total.timeToMerge.mean).toBeGreaterThan(0);
        expect(stats.total.timeToMerge.standardDeviation).toBeGreaterThan(0);
    });

    it('should return the total time to first comment statistics', () => {
        expect(stats.total.timeToFirstComment.values.length).toBeGreaterThan(0);
        expect(stats.total.timeToFirstComment.mean).toBeGreaterThan(0);
        expect(stats.total.timeToFirstComment.standardDeviation).toBeGreaterThan(0);
    });

    it('should return the pull request statistics sliced by user', () => {
        users.forEach(user => {
            expect(stats.slices.user[user].pullRequest.total).toBeGreaterThan(0);
            expect(typeof stats.slices.user[user].pullRequest.open).toBe('number');
            expect(typeof stats.slices.user[user].pullRequest.closed).toBe('number');
            expect(typeof stats.slices.user[user].pullRequest.merged).toBe('number');

            const { total, open, closed, merged } = stats.slices.user[user].pullRequest;
            expect(open + closed + merged).toBe(total);
        });
    });

    it('should return the pull request statistics sliced by day of the week', () => {
        [0, 1, 2, 3, 4, 5, 6].forEach(day => {
            expect(typeof stats.slices.day[day].pullRequest.total).toBe('number');
            expect(typeof stats.slices.day[day].pullRequest.open).toBe('number');
            expect(typeof stats.slices.day[day].pullRequest.closed).toBe('number');
            expect(typeof stats.slices.day[day].pullRequest.merged).toBe('number');

            const { total, open, closed, merged } = stats.slices.day[day].pullRequest;
            expect(open + closed + merged).toBe(total);
        });
    });
});
