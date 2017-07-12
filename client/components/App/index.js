import React, { Component } from 'react';
import Login from '../Login';
import Wizard from '../Wizard';
import { hasAccessToken, invalidateAccessToken } from '../../services/auth';
import { getLoggedInUser } from '../../services/users';

class App extends Component {
    async componentWillMount() {
        this.finishSelection = this.finishSelection.bind(this);

        this.state = {
            showLogin: !hasAccessToken(),
            showWizard: false,
            user: null,
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

    finishSelection(selectedRepositories, selectedUsers) {
        this.setState({
            selectedUsers,
            selectedRepositories,
            showWizard: false,
        });
    }

    render() {
        if (this.state.showLogin) {
            return <Login />;
        }
        if (this.state.showWizard) {
            return <Wizard user={this.state.user} finishSelection={this.finishSelection} />
        }
        return null;
    }
}

export default App;
