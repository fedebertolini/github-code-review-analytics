import React from 'react';
import { Table, Checkbox, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectUser, unselectUser } from '../../../store/actions/user';

const UserRow = ({ user, isSelected, selectUser, unselectUser }) => {

    const onUserSelectChange = (e, data) => {
        if (data.checked) {
            selectUser(user.get('login'));
        } else {
            unselectUser(user.get('login'));
        }
    }

    return (
        <Table.Row positive={isSelected}>
            <Table.Cell collapsing>
                <Checkbox
                    checked={isSelected}
                    onChange={onUserSelectChange}
                />
            </Table.Cell>
            <Table.Cell>
                <Image avatar src={user.get('avatar_url')} />
                {user.get('login')}
            </Table.Cell>
            <Table.Cell>{user.get('contributions')}</Table.Cell>
        </Table.Row>
    );
};

const mapDispatchToProps = {
    selectUser,
    unselectUser,
};

export default connect(null, mapDispatchToProps)(UserRow);
