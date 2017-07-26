import React, { Component } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import { Grid, Input } from 'semantic-ui-react';
import Item from './Item';
import Footer from '../Footer';
import { fetchRepositories, selectRepository, unselectRepository } from '../../../store/actions/repository';
import { getRepositories, getSelectedRepositories } from '../../../store/selectors/repository';

class Repositories extends Component {
    componentWillMount() {
        this.search = this.search.bind(this);
        this.onRepositorySelectChange = this.onRepositorySelectChange.bind(this);
        this.throttledSearch = throttle(this.search, 1000);

        this.search();
    }

    search(text) {
        this.props.fetchRepositories(text);
    }

    onRepositorySelectChange(repoName, value) {
        if (value) {
            this.props.selectRepository(repoName);
        } else {
            this.props.unselectRepository(repoName);
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

                {this.props.repositories.map((repository) => (
                    <Item
                        repository={repository}
                        selected={this.props.selectedRepositories.some(repo => repo === repository.get('name'))}
                        onSelect={this.onRepositorySelectChange}
                        key={repository.get('id')}
                    />
                ))}

                <Footer
                    items={this.props.selectedRepositories}
                    onRemove={this.onRepositorySelectChange}
                    onNextClick={this.props.selectRepositories}
                />
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    repositories: getRepositories(state),
    selectedRepositories: getSelectedRepositories(state),
});

const mapDispatchToProps = {
    fetchRepositories,
    selectRepository,
    unselectRepository,
};

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
