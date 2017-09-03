export const getRepositories = state => state.getIn(['repository', 'repositories']);
export const getSelectedRepositories = state => state.getIn(['repository', 'selectedRepositories']);
export const getLastUsedRepositories = state => state.getIn(['repository', 'lastUsed']);
