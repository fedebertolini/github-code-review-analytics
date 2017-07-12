import React from 'react';
import { Grid, Label, Icon, Button } from 'semantic-ui-react';

const Footer = ({items, onRemove, onNextClick}) => {
    if (items.length === 0) {
        return null;
    }
    return (
        <Grid.Row className="wizard_footer">
            <Grid.Column width={14}>
                <Label.Group color='blue'>
                    {items.map(item => (
                        <Label key={item}>
                            {item}
                            <Icon name="delete" onClick={() => onRemove(item)} />
                        </Label>
                    ))}
                </Label.Group>
            </Grid.Column>
            <Grid.Column width={2}>
                <Button color="green" fluid content="Next" onClick={onNextClick} />
            </Grid.Column>
        </Grid.Row>
    )
};

export default Footer;
