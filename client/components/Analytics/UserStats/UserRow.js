import React from 'react';
import round from 'lodash/round';
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
            {round(statistics.totalCommits / statistics.pullRequestsCreated, 1)}
        </Table.Cell>
    </Table.Row>
);

export default UserRow;
