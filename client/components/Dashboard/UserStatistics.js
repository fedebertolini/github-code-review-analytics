import React from 'react';
import { connect } from 'react-redux';
import round from 'lodash/round';
import { Image, Header } from 'semantic-ui-react';
import { getSelectedUsersData } from '../../store/selectors/user';
import { getUserSlice } from '../../store/selectors/statistics';
import StatisticsTable from './StatisticsTable';

const UserStatistics = ({ users, stats }) => (
    <StatisticsTable
        headers={headers()}
        rows={rows(users, stats)}
    />
);

const headers = () => [
    { id: 'user', title: 'User' },
    { id: 'createdPRs', title: 'Created PRs', textAlign: 'center' },
    { id: 'mergedPRs', title: 'Merged PRs', textAlign: 'center' },
    { id: 'commits', title: 'commits', textAlign: 'center' },
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

        return {
            user: getUserCell(user),
            createdPRs: userStats.getIn(['pullRequest', 'total']),
            mergedPRs: userStats.getIn(['pullRequest', 'merged']),
            commits: userStats.get('totalCommits'),
            commitsPerPR: round(userStats.get('totalCommits') / userStats.getIn(['pullRequest', 'total'])),
            timeToMerge: userStats.getIn(['timeToMerge', 'mean']),
            timeToFirstComment: userStats.getIn(['timeToFirstComment', 'mean']),
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
});

export default connect(mapStateToProps)(UserStatistics);
