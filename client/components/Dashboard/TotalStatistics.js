import React from 'react';
import { connect } from 'react-redux';
import round from 'lodash/round';
import { Header, Segment } from 'semantic-ui-react';
import { getTotalStatistics } from '../../store/selectors/statistics';
import StatisticsTable from './StatisticsTable';

const TotalStatistics = ({ stats }) => (
    <Segment>
        <Header as="h3">General statistics</Header>

        <StatisticsTable
            headers={headers()}
            rows={rows(stats)}
            sortBy="mergedPRs"
            sortAsc={false}
        />
    </Segment>
);

const headers = () => [
    { id: 'createdPRs', title: 'Created PRs', textAlign: 'center' },
    { id: 'mergedPRs', title: 'Merged PRs', textAlign: 'center' },
    { id: 'commits', title: 'Commits', textAlign: 'center' },
    { id: 'commitsPerPR', title: 'Commits / PR', textAlign: 'center' },
    { id: 'timeToMerge', title: 'Time to merge', textAlign: 'center' },
    { id: 'timeToFirstComment', title: 'Time to first comment', textAlign: 'center' },
];

const rows = (stats) => {
    if (!stats) {
        return [];
    }
    const pullRequests = stats.getIn(['pullRequest', 'total']);
    const commits = stats.get('totalCommits');

    return [{
        createdPRs: pullRequests,
        mergedPRs: stats.getIn(['pullRequest', 'merged']),
        commits,
        commitsPerPR: pullRequests ? round(commits / pullRequests) : '-',
        timeToMerge: stats.getIn(['timeToMerge', 'mean']) + ' hs',
        timeToFirstComment: stats.getIn(['timeToFirstComment', 'mean']) + ' hs',
    }];
};

const mapStateToProps = state => ({
    stats: getTotalStatistics(state),
});

export default connect(mapStateToProps)(TotalStatistics);
