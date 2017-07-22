import { mapGraphQLResult } from '../../services/pullRequests';
import janusResult from '../mocks/pull-requests/janusGraphQLResult.json';

describe('pullRequests service', () => {
    it('should map the graphQL search result', () => {
        const prs = mapGraphQLResult(janusResult);

        expect(prs.length).toEqual(100);

        prs.forEach(pr => {
            expect(pr.author).toBeTruthy();
            expect(pr.number).toBeGreaterThan(0);
            expect(pr.createdAt).toBeTruthy();
            expect(pr.state).toMatch(/[OPEN|CLOSED|MERGED]/);
            expect(pr.totalCommits).toBeGreaterThan(0);
            expect(pr.totalComments).toBeDefined();
            expect(pr.comments).toBeDefined();
        });
    });
});
