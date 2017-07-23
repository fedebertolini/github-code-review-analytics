import { ORGANIZATIONS_LOAD, ORGANIZATION_SELECT } from '../constants';

const defaultState = () => ({
    userOrganizations: [],
    selectedOrganization: null,
});

export default (state = defaultState(), action) => {
    switch (action.type) {
        case ORGANIZATIONS_LOAD:
            return Object.assign({}, state, {
                userOrganizations: action.payload,
            });
        case ORGANIZATION_SELECT:
            return Object.assign({}, state, {
                selectedOrganization: action.payload,
            });
        default:
            return state;
    }
};
