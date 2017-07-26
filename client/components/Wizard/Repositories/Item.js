import React from 'react';
import { Grid, Segment, Header, Checkbox } from 'semantic-ui-react';

const Item = ({ repository, selected, onSelect }) => (
    <Grid.Row>
        <Grid.Column>
            <Segment color="teal" tertiary={selected} inverted={selected}>
                <Header size='medium'>
                    <Checkbox
                        label={repository.get('name')}
                        checked={selected}
                        onChange={(e, data) => onSelect(repository.get('name'), data.checked)}
                    />
                </Header>
                <p>{repository.get('description')}</p>
            </Segment>
        </Grid.Column>
    </Grid.Row>
);

export default Item;
