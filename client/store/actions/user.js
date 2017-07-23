import { LOGGED_IN_USER_LOAD, USERS_LOAD, USER_SELECT, USER_UNSELECT } from '../constants';
import { getLoggedInUser } from '../../services/users';
import { getContributors } from '../../services/contributors';

export const fetchLoggedInUser = () => dispatch => {
    return getLoggedInUser().then(user => {
        dispatch({
            type: LOGGED_IN_USER_LOAD,
            payload: user,
        });
    });
};

export const fetchContributors = () => async (dispatch, getState) => {
    const state = getState();
    const organization = state.organization.selectedOrganization;
    const repositories = []; //TODO
    const users = await getContributors(organization, repositories);
    dispatch({
        type: USERS_LOAD,
        payload: users,
    });
};

export const selectUser = user => ({
    type: USER_SELECT,
    payload: user,
});

export const unselectUser = user => ({
    type: USER_UNSELECT,
    payload: user,
});
