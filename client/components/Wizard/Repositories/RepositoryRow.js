import React from 'react';
import { Table, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectRepository, unselectRepository } from '../../../store/actions/repository';

const RepositoryRow = ({ repository, isSelected, selectRepository, unselectRepository }) => {

    const onRepositorySelectChange = (e, data) => {
        if (data.checked) {
            selectRepository(repository.get('name'));
        } else {
            unselectRepository(repository.get('name'));
        }
    }

    return (
        <Table.Row positive={isSelected}>
            <Table.Cell collapsing>
                <Checkbox
                    checked={isSelected}
                    onChange={onRepositorySelectChange}
                />
            </Table.Cell>
            <Table.Cell>{repository.get('name')}</Table.Cell>
            <Table.Cell>{repository.get('description')}</Table.Cell>
        </Table.Row>
    );
};

const mapDispatchToProps = {
    selectRepository,
    unselectRepository,
};

export default connect(null, mapDispatchToProps)(RepositoryRow);
