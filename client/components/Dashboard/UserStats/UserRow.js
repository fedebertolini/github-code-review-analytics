import React from 'react';
import round from 'lodash/round';
import { Image, Table, Header } from 'semantic-ui-react';

const UserRow = ({ statistics }) => (
    <Table.Row key={statistics.user.id}>
        <Table.Cell>
            <Header as='h4' image>
                <Image src={statistics.user.get('avatar_url')} shape='rounded' size='mini' />
                <Header.Content>{statistics.user.get('login')}</Header.Content>
            </Header>
        </Table.Cell>
        <Table.Cell>{statistics.pullRequest.total}</Table.Cell>
        <Table.Cell>{statistics.pullRequest.merged}</Table.Cell>
        <Table.Cell>{statistics.totalCommits}</Table.Cell>
        <Table.Cell>
            {round(statistics.totalCommits / statistics.pullRequest.total, 1)}
        </Table.Cell>
        <Table.Cell>
            {statistics.timeToMerge.mean} ({statistics.timeToMerge.standardDeviation})
        </Table.Cell>
        <Table.Cell>
            {statistics.timeToFirstComment.mean} ({statistics.timeToFirstComment.standardDeviation})
        </Table.Cell>
    </Table.Row>
);

export default UserRow;
