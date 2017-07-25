import { fromJS } from 'immutable';
import { ORGANIZATIONS_LOAD, ORGANIZATION_SELECT } from '../constants';

const defaultState = () => fromJS({
    userOrganizations: [],
    selectedOrganization: null,
});

export default (state = defaultState(), action) => {
    switch (action.type) {
        case ORGANIZATIONS_LOAD:
            return state.set('userOrganizations', fromJS(action.payload))
        case ORGANIZATION_SELECT:
            return state.set('selectedOrganization', fromJS(action.payload))
        default:
            return state;
    }
};
