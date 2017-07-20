import React, { Component } from 'react';
import { getRepositoriesPullRequests } from '../../services/pullRequests';
import { getPullRequestsStatistics } from '../../services/statistics';
import UserStats from './UserStats';
import './styles.css';

class Analytics extends Component {

    async componentWillMount() {
        this.state = {
            statistics: null,
        };
        const { organization, repositories, users } = this.props;
        const filter = {
            authors: users.map(user => user.login)
        };
        const pullRequests = await getRepositoriesPullRequests(organization, repositories, filter);

        this.setState({
            statistics: getPullRequestsStatistics(pullRequests),
        });
    }

    render() {
        const stats = this.state.statistics;
        if (!stats) {
            return null;
        }
        return (
            <div className="analytics_page-container">
                <UserStats stats={stats.users} users={this.props.users} />

                <div>
                    <code>{JSON.stringify(stats, null, 4)}</code>
                </div>
            </div>
        );
    };
}

export default Analytics;
