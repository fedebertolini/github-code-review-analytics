import { fromJS, Map } from 'immutable';
import { STATISTICS_LOAD } from '../constants';

export default (state = new Map(), action) => {
    switch (action.type) {
        case STATISTICS_LOAD:
            return fromJS(action.payload);
        default:
            return state;
    }
};
