import React from 'react';
import { Table, Segment } from 'semantic-ui-react';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

const StatisticsTable = ({ headers, rows, sortByIndex, sortAsc }) => {
    if (rows.length === 0) {
        return null;
    }
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
                    {rows.map(row => (
                        <Table.Row>
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

export default StatisticsTable;
