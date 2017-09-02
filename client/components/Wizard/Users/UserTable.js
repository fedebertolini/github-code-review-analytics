import React from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUsers, getSelectedUsers } from '../../../store/selectors/user';
import UserRow from './UserRow';

const UserTable = ({ users, selectedUsers }) => (
    <Table celled compact definition>
        <Table.Header fullWidth>
            <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Contributions</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {users.map((user) => (
                <UserRow
                    user={user}
                    key={user.get('login')}
                    isSelected={selectedUsers.some(repo => repo === user.get('login'))}
                />
            ))}
        </Table.Body>
    </Table>
);

const mapStateToProps = state => ({
    users: getUsers(state),
    selectedUsers: getSelectedUsers(state),
});

export default connect(mapStateToProps)(UserTable);
