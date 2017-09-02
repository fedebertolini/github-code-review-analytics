import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Header, Input } from 'semantic-ui-react';
import UserTable from './UserTable';
import { getSelectedUsers } from '../../../store/selectors/user';
import { fetchContributors } from '../../../store/actions/user';

class Users extends Component {

    componentWillMount() {
        this.props.fetchContributors();

        this.state = { searchText: '' };
    }

    render() {
        return (
            <Grid centered>
                <Grid.Row>
                    <Grid.Column><Header as="h3">User Selection</Header></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Input
                            fluid
                            icon='search'
                            placeholder='Search...'
                            onChange={(e, data) => this.setState({ searchText: data.value })}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <UserTable searchText={this.state.searchText} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={5}>
                        <Button
                            onClick={this.props.selectUsers}
                            disabled={this.props.disableNextButton}
                            primary
                            fluid
                            content="Next"
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    disableNextButton: getSelectedUsers(state).size === 0,
});

const mapDispatchToProps = {
    fetchContributors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
