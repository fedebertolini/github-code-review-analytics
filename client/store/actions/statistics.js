import { STATISTICS_LOAD, STATISTICS_IN_PROGRESS } from '../constants';
import { getSelectedOrganization } from './../selectors/organization';
import { getSelectedRepositories } from './../selectors/repository';
import { getSelectedUsers } from './../selectors/user';
import { getRepositoriesPullRequests } from '../../services/pullRequests';
import { getPullRequestsStatistics } from '../../services/statistics';

export const loadStatistics = statistics => ({
    type: STATISTICS_LOAD,
    payload: statistics,
});

export const inProgressStatistics = () => ({
    type: STATISTICS_IN_PROGRESS,
});

export const fetchStatistics = ({ createdFrom }) => async (dispatch, getState) => {
    dispatch(inProgressStatistics());

    const state = getState();
    const organization = getSelectedOrganization(state);
    const repositories = getSelectedRepositories(state);
    const users = getSelectedUsers(state);

    const filter = {
        authors: users.toArray(),
        createdFrom,
    };

    const pullRequests = await getRepositoriesPullRequests(organization, repositories, filter);
    const statistics = getPullRequestsStatistics(pullRequests);
    dispatch(loadStatistics(statistics));
};
