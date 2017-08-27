export const getStatistics = state => state.get('statistics');
export const getTotalStatistics = state => state.getIn(['statistics', 'total']);
export const getUserSlice = state => state.getIn(['statistics', 'slices', 'user']);
