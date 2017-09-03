import React from 'react';
import { connect } from 'react-redux';
import round from 'lodash/round';
import { Header, Segment } from 'semantic-ui-react';
import { getDaySlice, getIsInProgress } from '../../store/selectors/statistics';
import StatisticsTable from './StatisticsTable';

const DayStatistics = ({ users, stats, inProgress }) => (
    <Segment loading={inProgress}>
        <Header as="h3">Sliced by day</Header>

        <StatisticsTable
            headers={headers()}
            rows={rows(stats)}
        />
    </Segment>
);

const headers = () => [
    { id: 'day', title: 'Day' },
    { id: 'createdPRs', title: 'Created PRs', textAlign: 'center' },
    { id: 'mergedPRs', title: 'Merged PRs', textAlign: 'center' },
    { id: 'commits', title: 'Commits', textAlign: 'center' },
    { id: 'commitsPerPR', title: 'Commits / PR', textAlign: 'center' },
    { id: 'timeToMerge', title: 'Time to merge', textAlign: 'center' },
    { id: 'timeToFirstComment', title: 'Time to first comment', textAlign: 'center' },
];

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
];

const isWeekday = day => day > 0 && day < 6;

const rows = (stats) => {
    if (!stats) {
        return [];
    }
    const result = stats.filter((stats, day) => isWeekday(day)).map((dayStats, day) => {
        const pullRequests = dayStats.getIn(['pullRequest', 'total']) || 0;
        const commits = dayStats.get('totalCommits');
        const timeToMerge = dayStats.getIn(['timeToMerge', 'mean']);
        const timeToFirstComment = dayStats.getIn(['timeToFirstComment', 'mean']);

        return {
            day: days[day],
            createdPRs: pullRequests,
            mergedPRs: dayStats.getIn(['pullRequest', 'merged']) || 0,
            commits: commits,
            commitsPerPR: pullRequests ? round(commits / pullRequests) : '-',
            timeToMerge: timeToMerge ? timeToMerge + ' hs' : '-',
            timeToFirstComment: timeToFirstComment ? timeToFirstComment + ' hs' : '-',
        }
    });
    return result.toArray();
};

const mapStateToProps = state => ({
    stats: getDaySlice(state),
    inProgress: getIsInProgress(state),
});

export default connect(mapStateToProps)(DayStatistics);
