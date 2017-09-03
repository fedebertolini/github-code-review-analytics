import { fromJS } from 'immutable';
import { STATISTICS_LOAD, STATISTICS_IN_PROGRESS } from '../constants';

const initialState = () => fromJS({
    inProgress: false,
});

export default (state = initialState(), action) => {
    switch (action.type) {
        case STATISTICS_LOAD:
            return fromJS(action.payload).set('inProgress', false);
        case STATISTICS_IN_PROGRESS:
            return state.set('inProgress', true);
        default:
            return state;
    }
};
