import { combineReducers } from 'redux-immutable';
import organization from './organization';
import user from './user';
import repository from './repository';

export default combineReducers({
    organization,
    user,
    repository,
});
