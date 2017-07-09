import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Header from './Header';
import Organizations from './Organizations';
import Repositories from './Repositories';
import './styles.css';

const gridWrapper = (step) => (
    <Grid.Row stretched>
        <Grid.Column stretched>
            {step}
        </Grid.Column>
    </Grid.Row>
);

class Wizard extends Component {
    componentWillMount() {
        this.state = {
            currentStep: 0,
            organization: null,
        };

        this.selectOrganization = this.selectOrganization.bind(this);
    }

    selectOrganization(organization) {
        this.setState({
            currentStep: 1,
            organization,
        });
    }

    render() {
        const userLogin = this.props.user.login;
        return (
            <Grid>
                <Grid.Row stretched>
                    <Grid.Column stretched>
                        <Header currentStep={this.state.currentStep} />
                    </Grid.Column>
                </Grid.Row>
                <Container className="wizard_step-container">
                    {this.state.currentStep === 0 && gridWrapper(
                        <Organizations
                            userLogin={userLogin}
                            selectOrganization={this.selectOrganization}
                        />
                    )}
                    {this.state.currentStep === 1 && gridWrapper(
                        <Repositories
                            organization={this.state.organization}
                        />
                    )}
                </Container>
            </Grid>
        )
    }
}

export default Wizard;
