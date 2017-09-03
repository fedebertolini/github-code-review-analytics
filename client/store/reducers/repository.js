import { fromJS } from 'immutable';
import {
    REPOSITORIES_LOAD,
    REPOSITORY_SELECT,
    REPOSITORY_UNSELECT,
    REPOSITORY_LOAD_LAST_USED,
} from '../constants';

const defaultState = () => fromJS({
    repositories: [],
    selectedRepositories: [],
    lastUsed: [],
});

export default (state = defaultState(), action) => {
    switch (action.type) {
        case REPOSITORIES_LOAD:
            return state.set('repositories', fromJS(action.payload));
        case REPOSITORY_SELECT: {
            const repos = state.get('selectedRepositories').push(fromJS(action.payload));
            return state.set('selectedRepositories', repos);
        }
        case REPOSITORY_UNSELECT: {
            const repos = state.get('selectedRepositories').filter(repo => repo !== action.payload);
            return state.set('selectedRepositories', repos);
        }
        case REPOSITORY_LOAD_LAST_USED:
            return state.set('lastUsed', fromJS(action.payload));
        default:
            return state;
    }
};
