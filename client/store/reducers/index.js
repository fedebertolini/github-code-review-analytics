import { combineReducers } from 'redux-immutable';
import organization from './organization';
import user from './user';
import repository from './repository';
import statistics from './statistics';

export default combineReducers({
    organization,
    user,
    repository,
    statistics,
});
