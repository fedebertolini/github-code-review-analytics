import { fromJS } from 'immutable';
import reducer from '../../../store/reducers/user';
import {
    LOGGED_IN_USER_LOAD,
    LOGGED_IN_USER_ERROR,
    USERS_LOAD,
    USER_SELECT,
    USER_UNSELECT
} from '../../../store/constants';

describe('user reducer', () => {
    it('should return the default state for unknown action types', () => {
        const result = reducer(undefined, { type: '' });

        expect(result.get('loggedInUser')).toBeNull();
        expect(result.get('loggedInUserError')).toBeNull();
        expect(result.get('users').size).toBe(0);
        expect(result.get('selectedUsers').size).toBe(0);
    });

    it('should load the logged in user', () => {
        const result = reducer(undefined, {
            type: LOGGED_IN_USER_LOAD,
            payload: {
                id: 1,
            }
        });

        expect(result.getIn(['loggedInUser', 'id'])).toBe(1);
    });

    it('should store the logged in error message', () => {
        const result = reducer(undefined, {
            type: LOGGED_IN_USER_ERROR,
            payload: 'error message'
        });

        expect(result.get('loggedInUserError')).toBe('error message');
    });

    it('should load the users array', () => {
        const users = [{
            id: 1,
        }, {
            id: 2,
        }];
        const result = reducer(undefined, {
            type: USERS_LOAD,
            payload: users,
        });

        expect(result.get('users').toJS()).toEqual(users);
    });

    it('should select users', () => {
        const result = reducer(undefined, {
            type: USER_SELECT,
            payload: {
                login: '123'
            },
        });

        expect(result.get('selectedUsers').toJS()).toEqual([{
            login: '123'
        }]);

        const newState = reducer(result, {
            type: USER_SELECT,
            payload: {
                login: '456'
            },
        });

        expect(newState.get('selectedUsers').toJS()).toEqual([{
            login: '123'
        }, {
            login: '456'
        }]);
    });

    it('should unselect users', () => {
        const previousState = fromJS({
            selectedUsers: [{
                login: '123'
            }, {
                login: '456'
            }],
        });
        const result = reducer(previousState, {
            type: USER_UNSELECT,
            payload: '123',
        });

        expect(result.get('selectedUsers').toJS()).toEqual([{
            login: '456'
        }]);
    });
});
