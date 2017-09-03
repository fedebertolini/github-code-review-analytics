import React from 'react';
import { connect } from 'react-redux';
import round from 'lodash/round';
import { Image, Header, Segment } from 'semantic-ui-react';
import { getSelectedUsersData } from '../../store/selectors/user';
import { getUserSlice, getIsInProgress } from '../../store/selectors/statistics';
import StatisticsTable from './StatisticsTable';

const UserStatistics = ({ users, stats, inProgress }) => (
    <Segment loading={inProgress}>
        <Header as="h3">Sliced by user</Header>

        <StatisticsTable
            headers={headers()}
            rows={rows(users, stats)}
            sortBy="mergedPRs"
            sortAsc={false}
        />
    </Segment>
);

const headers = () => [
    { id: 'user', title: 'User' },
    { id: 'createdPRs', title: 'Created PRs', textAlign: 'center' },
    { id: 'mergedPRs', title: 'Merged PRs', textAlign: 'center' },
    { id: 'commits', title: 'Commits', textAlign: 'center' },
    { id: 'commitsPerPR', title: 'Commits / PR', textAlign: 'center' },
    { id: 'timeToMerge', title: 'Time to merge', textAlign: 'center' },
    { id: 'timeToFirstComment', title: 'Time to first comment', textAlign: 'center' },
];

const rows = (users, stats) => {
    if (!stats) {
        return [];
    }
    const result = users.map((user) => {
        const userStats = stats.get(user.get('login'));
        const pullRequests = userStats ? userStats.getIn(['pullRequest', 'total']) : 0;
        const commits = userStats ? userStats.get('totalCommits') : 0;

        return {
            user: getUserCell(user),
            createdPRs: pullRequests,
            mergedPRs: userStats ? userStats.getIn(['pullRequest', 'merged']) : 0,
            commits,
            commitsPerPR: userStats ? round(commits / pullRequests) : '-',
            timeToMerge: userStats ? userStats.getIn(['timeToMerge', 'mean']) + ' hs' : '-',
            timeToFirstComment: userStats ? userStats.getIn(['timeToFirstComment', 'mean']) + ' hs' : '-',
        }
    });
    return result.toArray();
};

const getUserCell = (user) => (
    <Header as='h4' image>
        <Image src={user.get('avatar_url')} shape='rounded' size='mini' />
        <Header.Content>{user.get('login')}</Header.Content>
    </Header>
);

const mapStateToProps = state => ({
    users: getSelectedUsersData(state),
    stats: getUserSlice(state),
    inProgress: getIsInProgress(state),
});

export default connect(mapStateToProps)(UserStatistics);
