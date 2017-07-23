import React from 'react';
import { Icon, Header } from 'semantic-ui-react';
import './styles.css';

const SideBar = ({ organization, repositories = [], users = [] }) => (
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
            <div key={repo} className="sidebar_subitem">{repo}</div>
        ))}

        <div className="sidebar_item">
            <Header as="h4">
                <Icon name='users' /> Users
            </Header>
        </div>

        {users.map(user => (
            <div key={user.login} className="sidebar_subitem">{user.login}</div>
        ))}
    </div>
);

export default SideBar;
