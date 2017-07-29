import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import chunk from 'lodash/chunk';
import Item from './Item';
import Footer from '../Footer';
import { getSelectedOrganization } from '../../../store/selectors/organization';
import { getSelectedRepositories } from '../../../store/selectors/repository';
import { getUsers, getSelectedUsers } from '../../../store/selectors/user';
import { fetchContributors, selectUser, unselectUser } from '../../../store/actions/user';

class Users extends Component {
    componentWillMount() {
        this.onSelectUser = this.onSelectUser.bind(this);
        this.onNextClick = this.onNextClick.bind(this);

        this.props.fetchContributors();
    }

    onSelectUser(user, isSelected) {
        if (isSelected) {
            this.props.selectUser(user);
        } else {
            this.props.unselectUser(user);
        }
    }

    onNextClick() {
        this.props.selectUsers();
    }

    isUserSelected(user) {
        this.props.selectedUsers.some(selected => selected === user.get('login'));
    }

    render() {
        const { selectedUsers, users } = this.props;
        return (
            <Grid padded relaxed>
                {chunk(users.toArray(), 4).map((group, index) => (
                    <Grid.Row key={index}>
                        {group.map((user) => (
                            <Grid.Column key={user.get('login')} width={4}>
                                <Item
                                    user={user}
                                    isSelected={this.isUserSelected(user)}
                                    onSelect={this.onSelectUser}
                                />
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                ))}

                <Footer
                    items={selectedUsers}
                    onRemove={this.onSelectUser}
                    onNextClick={this.onNextClick}
                />
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    organization: getSelectedOrganization(state),
    repositories: getSelectedRepositories(state),
    users: getUsers(state),
    selectedUsers: getSelectedUsers(state),
});

const mapDispatchToProps = {
    fetchContributors,
    selectUser,
    unselectUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
