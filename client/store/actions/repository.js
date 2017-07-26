import { REPOSITORIES_LOAD, REPOSITORY_SELECT, REPOSITORY_UNSELECT } from '../constants';
import { getRepositories } from '../../services/repositories';
import { getSelectedOrganization } from '../selectors/organization';

export const fetchRepositories = (text) => async (dispatch, getState) => {
    const state = getState();
    const organization = getSelectedOrganization(state);

    const repos = await getRepositories(organization, text);
    dispatch({
        type: REPOSITORIES_LOAD,
        payload: repos,
    });
};

export const selectRepository = repository => ({
    type: REPOSITORY_SELECT,
    payload: repository,
});

export const unselectRepository = repository => ({
    type: REPOSITORY_UNSELECT,
    payload: repository,
});
