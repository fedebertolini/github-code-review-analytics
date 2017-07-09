import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import { Grid, Input, Segment, Divider, Header, Checkbox } from 'semantic-ui-react';
import { getRepositories } from '../../../services/repositories';

class Repositories extends Component {
    componentWillMount() {
        this.search = this.search.bind(this);
        this.throttledSearch = throttle(this.search, 1000);

        this.state = {
            repositories: [],
        };
        this.search();
    }

    async search(text) {
        try {
            const repositories = await getRepositories(this.props.organization, text);
            this.setState({ repositories });
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Grid centered>
                <Grid.Row>
                    <Grid.Column>
                        <Input
                            fluid
                            icon='search'
                            placeholder='Search...'
                            onChange={(e, data) => this.throttledSearch(data.value)}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                {this.state.repositories.map((respository) => (
                    <Grid.Row key={respository.id}>
                        <Grid.Column>
                            <Segment>
                                <Header size='medium'>
                                    <Checkbox toggle label={respository.name} />
                                </Header>
                                <p>{respository.description}</p>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                ))}
            </Grid>
        )
    }
}

export default Repositories;
