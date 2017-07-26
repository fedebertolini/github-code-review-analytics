import { fromJS } from 'immutable';
import { REPOSITORIES_LOAD, REPOSITORY_SELECT, REPOSITORY_UNSELECT } from '../constants';

const defaultState = () => fromJS({
    repositories: [],
    selectedRepositories: [],
});

export default (state = defaultState(), action) => {
    switch (action.type) {
        case REPOSITORIES_LOAD:
            return state.set('repositories', fromJS(action.payload))
        case REPOSITORY_SELECT: {
            const selectedRepositories = state.get('selectedRepositories').push(fromJS(action.payload));
            return state.set('selectedRepositories', selectedRepositories);
        }
        case REPOSITORY_UNSELECT: {
            const selectedRepositories = state.get('selectedRepositories').filter(repo => repo !== action.payload);
            return state.set('selectedRepositories', selectedRepositories);
        }
        default:
            return state;
    }
};
