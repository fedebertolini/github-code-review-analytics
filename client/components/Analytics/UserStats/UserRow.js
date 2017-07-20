import React from 'react';
import { Image, Table, Header } from 'semantic-ui-react';

const UserRow = ({ statistics }) => (
    <Table.Row key={statistics.user.id}>
        <Table.Cell>
            <Header as='h4' image>
                <Image src={statistics.user.avatar_url} shape='rounded' size='mini' />
                <Header.Content>
                    {statistics.user.login}
                </Header.Content>
            </Header>
        </Table.Cell>
        <Table.Cell>
            {statistics.pullRequestsCreated}
        </Table.Cell>
        <Table.Cell>
            {statistics.totalCommits}
        </Table.Cell>
        <Table.Cell>
            {statistics.totalAdditions}
        </Table.Cell>
        <Table.Cell>
            {statistics.totalDeletions}
        </Table.Cell>
    </Table.Row>
);

export default UserRow;
