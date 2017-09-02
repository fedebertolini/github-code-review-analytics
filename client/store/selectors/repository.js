import { List } from 'immutable';
export const getRepositories = state => state.getIn(['repository', 'repositories']) || new List();
export const getSelectedRepositories = state => state.getIn(['repository', 'selectedRepositories']) || new List();
