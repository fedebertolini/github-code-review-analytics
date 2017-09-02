import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import times from 'lodash/times';

const TablePagination = ({ totalPages, currentPage, selectPage }) => (
    <Menu floated='right' pagination>
        <Menu.Item
            as='a'
            icon
            disabled={currentPage === 1}
            onClick={() => currentPage > 1 && selectPage(currentPage - 1)}
        >
            <Icon name='left chevron' />
        </Menu.Item>

        {times(totalPages, Number).map(page => page + 1).map(page => (
            <Menu.Item
                key={page}
                as='a'
                content={page}
                active={currentPage === page}
                onClick={() => selectPage(page)}
            />
        ))}

        <Menu.Item
            as='a'
            icon
            onClick={() => currentPage < totalPages && selectPage(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            <Icon name='right chevron' />
        </Menu.Item>
    </Menu>
);

export default TablePagination;
