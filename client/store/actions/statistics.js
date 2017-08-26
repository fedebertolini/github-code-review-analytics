import { STATISTICS_LOAD } from '../constants';

export const loadStatistics = statistics => ({
    type: STATISTICS_LOAD,
    payload: statistics,
});
