import { ORGANIZATIONS_LOAD, ORGANIZATION_SELECT } from '../constants';
import { getUsersOrganizations } from '../../services/users';

export const searchUserOrganizations = (userLogin) => async (dispatch, getState) => {
    const organizations = await getUsersOrganizations(userLogin);
    dispatch({
        type: ORGANIZATIONS_LOAD,
        payload: organizations,
    });
};

export const selectOrganization = organization => ({
    type: ORGANIZATION_SELECT,
    payload: organization,
});
