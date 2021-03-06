import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Image, Button } from 'semantic-ui-react';
import { searchUserOrganizations } from '../../../store/actions/organization';
import { getUserOrganizations } from '../../../store/selectors/organization';

class Organizations extends Component {
    componentWillMount() {
        this.props.searchUserOrganizations();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.organizations.size === 1) {
            const organization = nextProps.organizations.first();
            this.props.selectOrganization(organization.get('login'));
        }
    }

    render() {
        const { organizations, selectOrganization } = this.props;

        return (
            <Grid centered>
                {organizations.map((organization) => (
                    <Card key={organization.get('id')}>
                        <Image src={organization.get('avatar_url')} />
                        <Card.Content>
                            <Card.Header>
                                {organization.get('login')}
                            </Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <Button
                                fluid
                                basic
                                color="blue"
                                onClick={() => selectOrganization(organization.get('login'))}
                                content="Select"
                            />
                        </Card.Content>
                    </Card>
                ))}
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    organizations: getUserOrganizations(state),
});

const mapDispatchToProps = {
    searchUserOrganizations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
