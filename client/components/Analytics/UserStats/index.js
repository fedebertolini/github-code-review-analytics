import React from 'react';
import { Table, Segment } from 'semantic-ui-react';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import UserRow from './UserRow';

const UserStats = ({stats, users}) => {
    const orderedList = sortUserList(stats, users);

    return (
        <Segment>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>PRs Created</Table.HeaderCell>
                        <Table.HeaderCell>Commits</Table.HeaderCell>
                        <Table.HeaderCell>Commits / PR</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {orderedList.map(statistics => (
                        <UserRow key={statistics.user.id} statistics={statistics} />
                    ))}
                </Table.Body>
            </Table>
        </Segment>
    );
};

const sortUserList = (stats, users) => {
    const list = users.reduce((userStats, user) => {
        if (stats[user.login]) {
            const stat = Object.assign(stats[user.login], { user });
            return userStats.concat([stat]);
        }
        return userStats;
    }, []);
    return reverse(sortBy(list, 'pullRequestsCreated'));
};

export default UserStats;
