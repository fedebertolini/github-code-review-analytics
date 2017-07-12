import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Header from './Header';
import Organizations from './Organizations';
import Repositories from './Repositories';
import Users from './Users';
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
            repositories: [],
        };

        this.selectOrganization = this.selectOrganization.bind(this);
        this.selectRepositories = this.selectRepositories.bind(this);
        this.selectUsers = this.selectUsers.bind(this);
    }

    selectOrganization(organization) {
        this.setState({
            currentStep: 1,
            organization,
        });
    }

    selectRepositories(repositories) {
        this.setState({
            currentStep: 2,
            repositories,
        });
    }

    selectUsers(users) {
        this.props.finishSelection(this.state.repositories, users);
    }

    render() {
        const userLogin = this.props.user.login;
        return (
            <Grid>
                <Grid.Row stretched className="wizard_header-container">
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
                            selectRepositories={this.selectRepositories}
                        />
                    )}
                    {this.state.currentStep === 2 && gridWrapper(
                        <Users
                            organization={this.state.organization}
                            repositories={this.state.repositories}
                            selectUsers={this.selectUsers}
                        />
                    )}
                </Container>
            </Grid>
        )
    }
}

export default Wizard;
