import React from 'react';
import { connect } from 'react-redux';
import { Icon, Header } from 'semantic-ui-react';
import { getSelectedOrganization } from '../../store/selectors/organization';
import { getSelectedRepositories } from '../../store/selectors/repository';
import { getSelectedUsersData } from '../../store/selectors/user';
import { unselectRepository } from '../../store/actions/repository';
import './styles.css';

const SideBar = ({ organization, repositories = [], users = [], unselectRepository }) => (
    <div>
        <div className="sidebar_item">
            <Header as="h4">
                <Icon name='building' /> Organization
            </Header>
        </div>

        {organization && (<div className="sidebar_subitem">{organization}</div>)}

        <div className="sidebar_item">
            <Header as="h4">
                <Icon name='book' /> Repositories
            </Header>
        </div>

        {repositories.map(repo => (
            <div key={repo} className="sidebar_subitem">
                <Icon name='remove' onClick={() => unselectRepository(repo)} />
                {repo}
            </div>
        ))}

        <div className="sidebar_item">
            <Header as="h4">
                <Icon name='users' /> Users
            </Header>
        </div>

        {users.map(user => (
            <div key={user.get('login')} className="sidebar_subitem">
                {user.get('login')}
            </div>
        ))}
    </div>
);

const mapStateToProps = state => ({
    organization: getSelectedOrganization(state),
    repositories: getSelectedRepositories(state),
    users: getSelectedUsersData(state)
});

const mapDispatchToProps = {
    unselectRepository,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
