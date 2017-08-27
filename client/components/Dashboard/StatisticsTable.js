import React from 'react';
import { Table, Segment } from 'semantic-ui-react';
import _sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

const StatisticsTable = ({ headers, rows, sortBy, sortAsc = true }) => {
    if (rows.length === 0) {
        return null;
    }
    const sortedRows = sortRows(rows, sortBy, sortAsc);
    return (
        <Segment>
            <Table>
                <Table.Header>
                    <Table.Row>
                        {headers.map(header => (
                            <Table.HeaderCell key={header.id}>
                                {header.title}
                            </Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sortedRows.map((row, index) => (
                        <Table.Row key={index}>
                            {headers.map(header => (
                                <Table.Cell key={header.id} textAlign={header.textAlign || 'left'}>
                                    {row[header.id]}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
    );
};

const sortRows = (rows, sortBy, sortAsc) => {
    if (!sortBy) {
        return rows;
    }
    const sorted = _sortBy(rows, sortBy);
    return sortAsc ? sorted : reverse(sorted);
};

export default StatisticsTable;
