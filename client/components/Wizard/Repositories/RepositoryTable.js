import React from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getRepositories, getSelectedRepositories } from '../../../store/selectors/repository';
import RepositoryRow from './RepositoryRow';

const RepositoryTable = ({ repositories, selectedRepositories }) => (
    <Table celled compact definition>
        <Table.Header fullWidth>
            <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {repositories.map((repository) => (
                <RepositoryRow
                    key={repository.get('id')}
                    repository={repository}
                    isSelected={selectedRepositories.some(repo => repo === repository.get('name'))}
                />
            ))}
        </Table.Body>
    </Table>
);

const mapStateToProps = state => ({
    repositories: getRepositories(state),
    selectedRepositories: getSelectedRepositories(state),
});

export default connect(mapStateToProps)(RepositoryTable);
