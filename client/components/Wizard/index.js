import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import Organizations from './Organizations';
import Repositories from './Repositories';
import Users from './Users';
import { selectOrganization } from '../../store/actions/organization';
import { getSelectedOrganization } from '../../store/selectors/organization';
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
        this.state = { currentStep: 0 };

        this.selectOrganization = this.selectOrganization.bind(this);
        this.selectRepositories = this.selectRepositories.bind(this);
        this.selectUsers = this.selectUsers.bind(this);
    }

    selectOrganization(organization) {
        this.props.selectOrganization(organization);
        this.setState({
            currentStep: 1,
        });
    }

    selectRepositories() {
        this.setState({ currentStep: 2 });
    }

    selectUsers(users) {
        this.props.finishSelection(users);
    }

    render() {
        const userLogin = this.props.user.login;
        return (
            <Container className="wizard_step-container">
                <Grid>
                    {this.state.currentStep === 0 && gridWrapper(
                        <Organizations
                            userLogin={userLogin}
                            selectOrganization={this.selectOrganization}
                        />
                    )}
                    {this.state.currentStep === 1 && gridWrapper(
                        <Repositories selectRepositories={this.selectRepositories} />
                    )}
                    {this.state.currentStep === 2 && gridWrapper(
                        <Users selectUsers={this.selectUsers} />
                    )}
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    organization: getSelectedOrganization(state),
});

const mapDispatchToProps = {
    selectOrganization,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
