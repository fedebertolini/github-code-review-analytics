export const getStatistics = state => state.get('statistics');
export const getUserSlice = state => state.getIn(['statistics', 'slices', 'user']);
