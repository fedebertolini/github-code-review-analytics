import React, { Component } from 'react';
import { getRepositoriesPullRequests } from '../../services/pullRequests';

class Analytics extends Component {

    async componentWillMount() {
        this.state = {
            pullRequests: [],
        };
        const { organization, repositories, users } = this.props;
        try {
            const filter = {
                involves: users
            };
            const pullRequests = await getRepositoriesPullRequests(organization, repositories, filter);

            this.setState({
                pullRequests,
            });
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                {this.state.pullRequests.map(pr => (
                    <div key={pr.id}>{pr.title}</div>
                ))}
            </div>
        );
    };
}

export default Analytics;
