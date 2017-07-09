import React, { Component } from 'react';
import { Grid, Card, Image, Button } from 'semantic-ui-react';
import { getUsersOrganizations } from '../../../services/users';

class Organizations extends Component {
    async componentWillMount() {
        this.state = {
            organizations: [],
        };
        try {
            const organizations = await getUsersOrganizations(this.props.userLogin);
            this.setState({ organizations });
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const selectOrganization = this.props.selectOrganization;
        return (
            <Grid centered>
                {this.state.organizations.map((organization) => (
                    <Card key={organization.id}>
                        <Image src={organization.avatar_url} />
                        <Card.Content>
                            <Card.Header>
                                {organization.login}
                            </Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <Button
                                fluid
                                basic
                                color="blue"
                                onClick={() => selectOrganization(organization.login)}
                                content="Select"
                            />
                        </Card.Content>
                    </Card>
                ))}
            </Grid>
        )
    }
}

export default Organizations;
