import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import Login from '../Login';
import Wizard from '../Wizard';
import Dashboard from '../Dashboard';
import AppHeader from '../AppHeader';
import SideBar from '../SideBar';
import { hasAccessToken, invalidateAccessToken } from '../../services/auth';
import { fetchLoggedInUser } from '../../store/actions/user';
import { getLoggedInUser, getLoggedInUserError } from '../../store/selectors/user';
import './styles.css';

class App extends Component {
    componentWillMount() {
        this.finishSelection = this.finishSelection.bind(this);

        this.state = {
            showLogin: !hasAccessToken(),
            showWizard: false,
            showDasboard: false,
            selectedUsers: [],
        };

        if (hasAccessToken()) {
            this.props.fetchLoggedInUser();
        }
    }

    finishSelection(selectedUsers) {
        this.setState({
            selectedUsers,
            showWizard: false,
            showDasboard: true,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.loggedInUserError && nextProps.loggedInUserError) {
            invalidateAccessToken();

            this.setState({
                showLogin: true,
            });
        }
        if (!this.props.loggedInUser && nextProps.loggedInUser) {
            this.setState({
                showWizard: true,
            });
        }
    }

    renderStep() {
        if (this.state.showLogin) {
            return <Login />;
        }
        if (this.state.showWizard) {
            return <Wizard user={this.props.loggedInUser} finishSelection={this.finishSelection} />
        }
        if (this.state.showDasboard) {
            return <Dashboard users={this.state.selectedUsers} />;
        }
        return null;
    }

    render() {
        return (
            <div className="app_container">
                <div className="app_header-container">
                    <AppHeader />
                </div>
                <Grid className="app_content-container">
                    <Grid.Row>
                        <Grid.Column width={3} className="app_sidebar-container">
                            <SideBar />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            {this.renderStep()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedInUser: getLoggedInUser(state),
    loggedInUserError: getLoggedInUserError(state),
});

const mapDispatchToProps = {
    fetchLoggedInUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
