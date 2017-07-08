import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Header from './Header';

class Wizard extends Component {
    componentWillMount() {
        this.state = {
            currentStep: 0,
        };
    }

    render() {
        return (
            <Grid>
                <Grid.Row stretched>
                    <Grid.Column stretched centered>
                        <Header currentStep={this.state.currentStep} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Wizard;
