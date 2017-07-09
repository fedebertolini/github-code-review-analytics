import React from 'react';
import { Grid, Label, Icon, Button } from 'semantic-ui-react';

const Footer = ({selectedRepositories, onRemove, onNextClick}) => {
    if (selectedRepositories.length === 0) {
        return null;
    }
    return (
        <Grid.Row className="wizard_repositories_footer">
            <Grid.Column width={14}>
                <Label.Group color='blue'>
                    {selectedRepositories.map(repo => (
                        <Label key={repo}>
                            {repo}
                            <Icon name="delete" onClick={() => onRemove(repo)} />
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
