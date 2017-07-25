import { fromJS } from 'immutable';
import reducer from '../../../store/reducers/organization';
import { ORGANIZATIONS_LOAD, ORGANIZATION_SELECT } from '../../../store/constants';

describe('organization reducer', () => {
    it('should return the default state for unknown action types', () => {
        const result = reducer(undefined, { type: '' });

        expect(result.get('selectedOrganization')).toBeNull();
        expect(result.get('userOrganizations').size).toBe(0);
    });

    it('should load the user organizations array', () => {
        const organizations = [{
            id: 1,
        }, {
            id: 2,
        }];
        const result = reducer(undefined, {
            type: ORGANIZATIONS_LOAD,
            payload: organizations,
        });

        expect(result.get('userOrganizations').toJS()).toEqual(organizations);
    });

    it('should select an organization', () => {
        const result = reducer(undefined, {
            type: ORGANIZATION_SELECT,
            payload: {
                id: 1
            },
        });

        expect(result.get('selectedOrganization').toJS()).toEqual({ id: 1 });
    });
});
