import React, { Component } from 'react';
import { connect } from 'react-redux';
import subMonths from 'date-fns/sub_months';
import formatDate from 'date-fns/format';
import Filters from './Filters';
import UserStatistics from './UserStatistics';
import TotalStatistics from './TotalStatistics';
import DayStatistics from './DayStatistics';
import RepositoryStatistics from './RepositoryStatistics';
import { fetchStatistics } from '../../store/actions/statistics';
import './styles.css';

class Dashboard extends Component {

    componentWillMount() {
        this.refreshStatistics = this.refreshStatistics.bind(this);
        this.setNumberOfMonths = this.setNumberOfMonths.bind(this);

        this.state = {
            numberOfMonths: 1,
        };
        this.refreshStatistics(1);
    }

    refreshStatistics(months) {
        const filter = {};
        if (months) {
            filter.createdFrom = formatDate(subMonths(new Date(), months), 'YYYY-MM-DD');
        }
        this.props.fetchStatistics(filter);
    }

    setNumberOfMonths(months) {
        this.setState({
            numberOfMonths: months,
        });
        this.refreshStatistics(months);
    }

    render() {
        return (
            <div className="dashboard_page-container">
                <Filters
                    numberOfMonths={this.state.numberOfMonths}
                    setNumberOfMonths={this.setNumberOfMonths}
                />
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
