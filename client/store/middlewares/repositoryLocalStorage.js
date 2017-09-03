import localStorage from 'store';
import uniq from 'lodash/uniq';
import { REPOSITORY_SELECT, REPOSITORY_LOCAL_STORAGE } from '../constants';
import { getSelectedRepositories } from '../selectors/repository';

export default store => next => (action) => {
    const result = next(action);

    if (action.type === REPOSITORY_SELECT) {
        const selectedRepos = getSelectedRepositories(store.getState()).toJS();
        const storedRepos = localStorage.get(REPOSITORY_LOCAL_STORAGE) || [];
        const repos = uniq(selectedRepos.concat(storedRepos)).slice(0, 5);
        localStorage.set(REPOSITORY_LOCAL_STORAGE, repos);
    }

    return result;
};
