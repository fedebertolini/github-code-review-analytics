export const getStatistics = state => state.get('statistics');
export const getTotalStatistics = state => state.getIn(['statistics', 'total']);
export const getUserSlice = state => state.getIn(['statistics', 'slices', 'user']);
export const getDaySlice = state => state.getIn(['statistics', 'slices', 'day']);
export const getRepositorySlice = state => state.getIn(['statistics', 'slices', 'repository']);
export const getIsInProgress = state => state.getIn(['statistics', 'inProgress']);
