import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Login from '../Login';
import Wizard from '../Wizard';
import Dashboard from '../Dashboard';
import AppHeader from '../AppHeader';
import SideBar from '../SideBar';
import { hasAccessToken, invalidateAccessToken } from '../../services/auth';
import { getLoggedInUser } from '../../services/users';
import './styles.css';

class App extends Component {
    async componentWillMount() {
        this.finishSelection = this.finishSelection.bind(this);

        this.state = {
            showLogin: !hasAccessToken(),
            showWizard: false,
            showDasboard: false,
            user: null,
            selectedOrganization: null,
            selectedUsers: [],
            selectedRepositories: [],
        };

        if (hasAccessToken()) {
            try {
                const user = await getLoggedInUser();
                this.setState({
                    user,
                    showWizard: true,
                });
            } catch(e) {
                invalidateAccessToken();

                this.setState({
                    showLogin: true,
                });
            }
        }
    }

    finishSelection(selectedOrganization, selectedRepositories, selectedUsers) {
        this.setState({
            selectedOrganization,
            selectedUsers,
            selectedRepositories,
            showWizard: false,
            showDasboard: true,
        });
    }

    renderStep() {
        if (this.state.showLogin) {
            return <Login />;
        }
        if (this.state.showWizard) {
            return <Wizard user={this.state.user} finishSelection={this.finishSelection} />
        }
        if (this.state.showDasboard) {
            return (
                <Dashboard
                    organization={this.state.selectedOrganization}
                    repositories={this.state.selectedRepositories}
                    users={this.state.selectedUsers}
                />
            )
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
                            <SideBar
                                organization={this.state.selectedOrganization}
                                repositories={this.state.selectedRepositories}
                                users={this.state.selectedUsers}
                            />
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

export default App;
