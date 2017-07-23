import {
    LOGGED_IN_USER_LOAD,
    LOGGED_IN_USER_ERROR,
    USERS_LOAD,
    USER_SELECT,
    USER_UNSELECT
} from '../constants';

const defaultState = () => ({
    loggedInUser: null,
    loggedInUserError: null,
    users: [],
    selectedUsers: [],
});

export default (state = defaultState(), action) => {
    switch (action.type) {
        case LOGGED_IN_USER_LOAD:
            return Object.assign({}, state, {
                loggedInUser: action.payload,
                loggedInUserError: null,
            });
        case LOGGED_IN_USER_ERROR:
            return Object.assign({}, state, {
                loggedInUserError: action.payload,
            });
        case USERS_LOAD:
            return Object.assign({}, state, {
                users: action.payload,
            });
        case USER_SELECT:
            return Object.assign({}, state, {
                selectedUsers: state.selectedUsers.concat([action.payload]),
            });
        case USER_UNSELECT:
            return Object.assign({}, state, {
                selectedUsers: state.selectedUsers.filter(user => user.login !== action.payload),
            });
        default:
            return state;
    }
};
