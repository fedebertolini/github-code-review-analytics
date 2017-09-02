import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { Grid, Input, Header, Button } from 'semantic-ui-react';
import RepositoryTable from './RepositoryTable';
import { getSelectedRepositories } from '../../../store/selectors/repository';
import { fetchRepositories } from '../../../store/actions/repository';

class Repositories extends Component {
    componentWillMount() {
        this.search = this.search.bind(this);
        this.debouncedSearch = debounce(this.search, 1000);

        this.search();
    }

    search(text) {
        this.props.fetchRepositories(text);
    }

    render() {
        return (
            <Grid centered>
                <Grid.Row>
                    <Grid.Column><Header as="h3">Repository Selection</Header></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Input
                            fluid
                            icon='search'
                            placeholder='Search...'
                            onChange={(e, data) => this.debouncedSearch(data.value)}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <RepositoryTable />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={5}>
                        <Button
                            onClick={this.props.selectRepositories}
                            disabled={this.props.disableNextButton}
                            primary
                            fluid
                            content="Next"
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    disableNextButton: getSelectedRepositories(state).size === 0,
});

export default connect(mapStateToProps, { fetchRepositories })(Repositories);
