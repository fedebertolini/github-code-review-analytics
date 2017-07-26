import React, { Component } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import { Grid, Input } from 'semantic-ui-react';
import Item from './Item';
import Footer from '../Footer';
import { getRepositories } from '../../../services/repositories';
import { getSelectedOrganization } from '../../../store/selectors/organization';

class Repositories extends Component {
    componentWillMount() {
        this.search = this.search.bind(this);
        this.onRepositorySelectChange = this.onRepositorySelectChange.bind(this);
        this.selectRepositories = this.selectRepositories.bind(this);
        this.throttledSearch = throttle(this.search, 1000);

        this.state = {
            repositories: [],
            selectedRepositories: []
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

    onRepositorySelectChange(repoName, value) {
        const selected = this.state.selectedRepositories;
        if (value) {
            this.setState({
                selectedRepositories: selected.concat([repoName]),
            });
        } else {
            this.setState({
                selectedRepositories: selected.filter(repo => repo !== repoName),
            });
        }
    }

    selectRepositories() {
        this.props.selectRepositories(this.state.selectedRepositories);
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

                {this.state.repositories.map((repository) => (
                    <Item
                        repository={repository}
                        selected={this.state.selectedRepositories.some(repo => repo === repository.name)}
                        onSelect={this.onRepositorySelectChange}
                        key={repository.id}
                    />
                ))}

                <Footer
                    items={this.state.selectedRepositories}
                    onRemove={this.onRepositorySelectChange}
                    onNextClick={this.selectRepositories}
                />
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    organization: getSelectedOrganization(state),
});

export default connect(mapStateToProps)(Repositories);
