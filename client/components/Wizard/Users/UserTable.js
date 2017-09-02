import React, { Component } from 'react';
import { is } from 'immutable';
import { Table, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import { getUsers, getSelectedUsers } from '../../../store/selectors/user';
import { selectUser, unselectUser } from '../../../store/actions/user';
import UserRow from './UserRow';
import TablePagination from './TablePagination';

const PAGE_SIZE = 8;

class UserTable extends Component {

    componentWillMount() {
        this.isUserSelected = this.isUserSelected.bind(this);
        this.selectPage = this.selectPage.bind(this);
        this.unselectAll = this.unselectAll.bind(this);
        this.selectAll = this.selectAll.bind(this);

        this.state = {
            filteredUsers: this.props.users,
            currentPage: 1,
            totalPages: Math.ceil(this.props.users.size / PAGE_SIZE),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.searchText !== nextProps.searchText || !is(this.props.users, nextProps.users)) {
            const filteredUsers = nextProps.users.filter(user =>
                includes(user.get('login'), nextProps.searchText)
            );
            this.setState({
                filteredUsers,
                currentPage: 1,
                totalPages: Math.ceil(filteredUsers.size / PAGE_SIZE),
            });
        }
    }

    isUserSelected(user) {
        return this.props.selectedUsers.some(repo => repo === user.get('login'));
    }

    selectPage(page) {
        this.setState({ currentPage: page });
    }

    unselectAll(users) {
        users.forEach(user => this.props.unselectUser(user.get('login')));
    }

    selectAll(users) {
        users.forEach(user => this.props.selectUser(user.get('login')));
    }

    render() {
        const page = this.state.currentPage;
        const visibleUsers = this.state.filteredUsers.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page);
        const areAllChecked = visibleUsers.size > 0 && visibleUsers.every(this.isUserSelected);
        const areSomeChecked = !areAllChecked && visibleUsers.some(this.isUserSelected);
        return (
            <Table celled compact definition>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Checkbox
                                checked={areAllChecked}
                                indeterminate={areSomeChecked}
                                onChange={() => areSomeChecked || areAllChecked ?
                                    this.unselectAll(visibleUsers) :
                                    this.selectAll(visibleUsers)
                                }
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Contributions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {visibleUsers.map((user) => (
                        <UserRow
                            user={user}
                            key={user.get('login')}
                            isSelected={this.isUserSelected(user)}
                        />
                    ))}
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <TablePagination
                                totalPages={this.state.totalPages}
                                currentPage={this.state.currentPage}
                                selectPage={this.selectPage}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

const mapStateToProps = state => ({
    users: getUsers(state),
    selectedUsers: getSelectedUsers(state),
});

const mapDispatchToProps = {
    unselectUser,
    selectUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
