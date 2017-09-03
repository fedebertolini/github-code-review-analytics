import React, { Component } from 'react';
import { connect } from 'react-redux';
import subMonths from 'date-fns/sub_months';
import formatDate from 'date-fns/format';
import UserStatistics from './UserStatistics';
import TotalStatistics from './TotalStatistics';
import DayStatistics from './DayStatistics';
import RepositoryStatistics from './RepositoryStatistics';
import { fetchStatistics } from '../../store/actions/statistics';
import './styles.css';

class Dashboard extends Component {

    componentWillMount() {
        this.props.fetchStatistics({
            createdFrom: formatDate(subMonths(new Date(), 1), 'YYYY-MM-DD'),
        });
    }

    render() {
        return (
            <div className="dashboard_page-container">
                <TotalStatistics />
                <RepositoryStatistics />
                <UserStatistics />
                <DayStatistics />
            </div>
        );
    };
}

const mapDispatchToProps = {
    fetchStatistics,
};

export default connect(null, mapDispatchToProps)(Dashboard);
