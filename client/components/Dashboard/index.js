import React, { Component } from 'react';
import { connect } from 'react-redux';
import subMonths from 'date-fns/sub_months';
import formatDate from 'date-fns/format';
import { getRepositoriesPullRequests } from '../../services/pullRequests';
import { getPullRequestsStatistics } from '../../services/statistics';
import UserStats from './UserStats';
import { getSelectedOrganization } from '../../store/selectors/organization';
import { getSelectedRepositories } from '../../store/selectors/repository';
import './styles.css';

class Dashboard extends Component {

    async componentWillMount() {
        this.state = {
            statistics: null,
        };
        const { organization, repositories, users } = this.props;
        const filter = {
            authors: users.map(user => user.login),
            createdFrom: formatDate(subMonths(new Date(), 1), 'YYYY-MM-DD')
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
            <div className="dashboard_page-container">
                <UserStats stats={stats.slices.user} users={this.props.users} />

                <div>
                    <code>{JSON.stringify(stats, null, 4)}</code>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    organization: getSelectedOrganization(state),
    repositories: getSelectedRepositories(state),
});

export default connect(mapStateToProps)(Dashboard);
