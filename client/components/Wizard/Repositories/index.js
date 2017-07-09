import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import { Grid, Input, Divider } from 'semantic-ui-react';
import Item from './Item';
import { getRepositories } from '../../../services/repositories';

class Repositories extends Component {
    componentWillMount() {
        this.search = this.search.bind(this);
        this.onRepositorySelectChange = this.onRepositorySelectChange.bind(this);
        this.throttledSearch = throttle(this.search, 1000);

        this.state = {
            repositories: [],
            selectedRepositories: {}
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

    onRepositorySelectChange(id, value) {
        const selectedRepositories = Object.assign({}, this.state.selectedRepositories);
        selectedRepositories[id] = value;
        this.setState({ selectedRepositories });
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

                {this.state.repositories.map((repository) => (
                    <Item
                        repository={repository}
                        selected={this.state.selectedRepositories[repository.id]}
                        onSelect={this.onRepositorySelectChange}
                        key={repository.id}
                    />
                ))}
            </Grid>
        )
    }
}

export default Repositories;
