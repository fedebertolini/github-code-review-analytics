import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import chunk from 'lodash/chunk';
import { getContributors } from '../../../services/contributors';
import Item from './Item';
import Footer from '../Footer';

class Users extends Component {
    async componentWillMount() {
        this.onSelectUser = this.onSelectUser.bind(this);

        this.state = {
            users: [],
            selectedUsers: [],
        };
        try {
            const users = await getContributors(this.props.organization, this.props.repositories);
            this.setState({ users });
        } catch(e) {
            console.log(e);
        }
    }

    onSelectUser(user, isSelected) {
        if (isSelected) {
            this.setState({
                selectedUsers: this.state.selectedUsers.concat([user]),
            });
        } else {
            this.setState({
                selectedUsers: this.state.selectedUsers.filter(login => user !== login),
            });
        }
    }

    render() {
        return (
            <Grid padded relaxed>
                {chunk(this.state.users, 4).map((group, index) => (
                    <Grid.Row key={index}>
                        {group.map((user) => (
                            <Grid.Column key={user.login} width={4}>
                                <Item
                                    user={user}
                                    isSelected={this.state.selectedUsers.some(login => login === user.login)}
                                    onSelect={this.onSelectUser}
                                />
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                ))}

                <Footer
                    items={this.state.selectedUsers}
                    onRemove={this.onSelectUser}
                    onNextClick={null}
                />
            </Grid>
        )
    }
}

export default Users;
