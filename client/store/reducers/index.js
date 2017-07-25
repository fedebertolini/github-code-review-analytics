import { combineReducers } from 'redux-immutable';
import organization from './organization';
import user from './user';

export default combineReducers({
    organization,
    user,
});
