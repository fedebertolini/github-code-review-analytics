import React, { Component } from 'react';
import { getUsers } from '../../services/userApi';

import './styles.css';

class App extends Component {
    async componentWillMount() {
        this.state = {
            users: [],
        };

        const users = await getUsers();
        this.setState({
            users: users
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to React-Express Boilerplate</h2>
                </div>
                <div>
                    <h3>Users:</h3>
                    {this.state.users.map((user) => (
                        <h5 key={user.id}>{user.id} - {user.username}</h5>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
