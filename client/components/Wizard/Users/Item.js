import React from 'react';
import { Image, Card, Checkbox } from 'semantic-ui-react';

const Item = ({ user, isSelected, onSelect }) => (
    <Card>
        <Image src={user.get('avatar_url')} />
        <Card.Content>
            <Checkbox
                label={user.get('login')}
                checked={isSelected}
                onChange={(e, data) => onSelect(user.get('login'), data.checked)}
            />
        </Card.Content>
    </Card>
);

export default Item;
