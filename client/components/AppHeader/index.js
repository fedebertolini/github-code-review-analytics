import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import './styles.css';

const AppHeader = () => (
    <Grid padded className="app-header_container">
        <Grid.Row>
            <Grid.Column>
                <Header as='h3' icon='bar chart' content="Github Code Review Analytics" />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default AppHeader;
