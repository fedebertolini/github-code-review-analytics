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
            payload: {
                id: 1
            },
        });

        expect(result.get('selectedRepositories').toJS()).toEqual([{
            id: 1
        }]);

        const newState = reducer(result, {
            type: REPOSITORY_SELECT,
            payload: {
                id: 3,
            },
        });

        expect(newState.get('selectedRepositories').toJS()).toEqual([{
            id: 1
        }, {
            id: 3
        }]);
    });

    it('should unselect repos', () => {
        const previousState = fromJS({
            selectedRepositories: [{
                id: 1
            }, {
                id: 2
            }],
        });
        const result = reducer(previousState, {
            type: REPOSITORY_UNSELECT,
            payload: 1,
        });

        expect(result.get('selectedRepositories').toJS()).toEqual([{
            id: 2
        }]);
    });
});
