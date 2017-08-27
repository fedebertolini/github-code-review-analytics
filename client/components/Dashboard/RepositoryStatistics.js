import React from 'react';
import { connect } from 'react-redux';
import round from 'lodash/round';
import { Header, Segment } from 'semantic-ui-react';
import { getRepositorySlice } from '../../store/selectors/statistics';
import StatisticsTable from './StatisticsTable';

const RepositoryStatistics = ({ users, stats }) => (
    <Segment>
        <Header as="h3">Sliced by repository</Header>

        <StatisticsTable
            headers={headers()}
            rows={rows(stats)}
            sortBy="mergedPRs"
            sortAsc={false}
        />
    </Segment>
);

const headers = () => [
    { id: 'repository', title: 'Repository' },
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
    const result = stats.map((repoStats, repository) => {
        const pullRequests = repoStats.getIn(['pullRequest', 'total']) || 0;
        const commits = repoStats.get('totalCommits');
        const timeToMerge = repoStats.getIn(['timeToMerge', 'mean']);
        const timeToFirstComment = repoStats.getIn(['timeToFirstComment', 'mean']);

        return {
            repository,
            createdPRs: pullRequests,
            mergedPRs: repoStats.getIn(['pullRequest', 'merged']) || 0,
            commits: commits,
            commitsPerPR: pullRequests ? round(commits / pullRequests) : '-',
            timeToMerge: timeToMerge ? timeToMerge + ' hs' : '-',
            timeToFirstComment: timeToFirstComment ? timeToFirstComment + ' hs' : '-',
        }
    });
    return result.toArray();
};

const mapStateToProps = state => ({
    stats: getRepositorySlice(state),
});

export default connect(mapStateToProps)(RepositoryStatistics);
