import { fromJS } from 'immutable';
import reducer from '../../../store/reducers/repository';
import { REPOSITORIES_LOAD, REPOSITORY_SELECT, REPOSITORY_UNSELECT } from '../../../store/constants';

describe('repository reducer', () => {
    it('should return the default state for unknown action types', () => {
        const result = reducer(undefined, { type: '' });

        expect(result.get('repositories').size).toBe(0);
        expect(result.get('selectedRepositories').size).toBe(0);
    });

    it('should load the repository array', () => {
        const repos = [{
            id: 1,
        }, {
            id: 2,
        }];
        const result = reducer(undefined, {
            type: REPOSITORIES_LOAD,
            payload: repos,
        });

        expect(result.get('repositories').toJS()).toEqual(repos);
    });

    it('should select repos', () => {
        const result = reducer(undefined, {
            type: REPOSITORY_SELECT,
            payload: 'janus',
        });

        expect(result.get('selectedRepositories').toJS()).toEqual(['janus']);

        const newState = reducer(result, {
            type: REPOSITORY_SELECT,
            payload: 'test-repo',
        });

        expect(newState.get('selectedRepositories').toJS()).toEqual(['janus', 'test-repo']);
    });

    it('should unselect repos', () => {
        const previousState = fromJS({
            selectedRepositories: ['janus', 'test-repo'],
        });
        const result = reducer(previousState, {
            type: REPOSITORY_UNSELECT,
            payload: 'test-repo',
        });

        expect(result.get('selectedRepositories').toJS()).toEqual(['janus']);
    });
});
