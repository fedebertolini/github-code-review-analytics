import React, { Component } from 'react';
import Login from '../Login';
import { hasAccessToken, invalidateAccessToken } from '../../services/auth';
import { getLoggedInUser } from '../../services/users';

class App extends Component {
    async componentWillMount() {
        this.state = {
            showLogin: !hasAccessToken(),
            user: null,
        };

        if (hasAccessToken()) {
            try {
                const user = await getLoggedInUser();
                this.setState({ user });
            } catch(e) {
                invalidateAccessToken();

                this.setState({
                    showLogin: true,
                });
            }
        }
    }

    render() {
        if (this.state.showLogin) {
            return <Login />;
        }
        if (this.state.user) {
            return (
                <div>
                    {this.state.user.name}
                </div>
            );
        }
        return null;
    }
}

export default App;
