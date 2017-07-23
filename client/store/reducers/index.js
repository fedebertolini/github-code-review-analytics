import { combineReducers } from 'redux';
import organization from './organization';
import user from './user';

export default combineReducers({
    organization,
    user,
});
