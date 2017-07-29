import { fromJS } from 'immutable';
import {
    LOGGED_IN_USER_LOAD,
    LOGGED_IN_USER_ERROR,
    USERS_LOAD,
    USER_SELECT,
    USER_UNSELECT
} from '../constants';

const defaultState = () => fromJS({
    loggedInUser: null,
    loggedInUserError: null,
    users: [],
    selectedUsers: [],
});

export default (state = defaultState(), action) => {
    switch (action.type) {
        case LOGGED_IN_USER_LOAD:
            return state.merge({
                loggedInUser: action.payload,
                loggedInUserError: null,
            });
        case LOGGED_IN_USER_ERROR:
            return state.set('loggedInUserError', action.payload);
        case USERS_LOAD:
            return state.set('users', fromJS(action.payload));
        case USER_SELECT: {
            const selectedUsers = state.get('selectedUsers').push(fromJS(action.payload));
            return state.set('selectedUsers', selectedUsers);
        }
        case USER_UNSELECT: {
            const selectedUsers = state.get('selectedUsers').filter(user => user !== action.payload);
            return state.set('selectedUsers', selectedUsers);
        }
        default:
            return state;
    }
};
