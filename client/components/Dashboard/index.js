import React, { Component } from 'react';
import { connect } from 'react-redux';
import subMonths from 'date-fns/sub_months';
import formatDate from 'date-fns/format';
import { getRepositoriesPullRequests } from '../../services/pullRequests';
import { getPullRequestsStatistics } from '../../services/statistics';
import UserStatistics from './UserStatistics';
import TotalStatistics from './TotalStatistics';
import { getSelectedOrganization } from '../../store/selectors/organization';
import { getSelectedRepositories } from '../../store/selectors/repository';
import { getSelectedUsers } from '../../store/selectors/user';
import { loadStatistics } from '../../store/actions/statistics';
import './styles.css';

class Dashboard extends Component {

    async componentWillMount() {
        const { organization, repositories, users } = this.props;
        const filter = {
            authors: users.toArray(),
            createdFrom: formatDate(subMonths(new Date(), 1), 'YYYY-MM-DD'),
        };
        const pullRequests = await getRepositoriesPullRequests(organization, repositories, filter);
        this.props.loadStatistics(getPullRequestsStatistics(pullRequests));
    }

    render() {
        return (
            <div className="dashboard_page-container">
                <TotalStatistics />
                <UserStatistics />
            </div>
        );
    };
}

const mapStateToProps = state => ({
    organization: getSelectedOrganization(state),
    repositories: getSelectedRepositories(state),
    users: getSelectedUsers(state),
});

const mapDispatchToProps = {
    loadStatistics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
