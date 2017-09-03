import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react';
import { getSelectedRepositories, getLastUsedRepositories } from '../../../store/selectors/repository';
import { selectRepository } from '../../../store/actions/repository';

const LastUsed = ({ repositories, selectRepository }) => (
    <Label.Group color='blue'>
        {repositories.map(repository => (
            <Label
                as='a'
                key={repository}
                content={repository}
                icon='add'
                onClick={() => selectRepository(repository)}
            />
        ))}
    </Label.Group>
);

const mapStateToProps = state => {
    const selectedRepositories = getSelectedRepositories(state);
    const lastUsed = getLastUsedRepositories(state);
    const recommended = lastUsed.filter(repo => selectedRepositories.every(selected => selected !== repo));

    return {
        repositories: recommended,
    };
};

const mapDispatchToProps = {
    selectRepository,
};

export default connect(mapStateToProps, mapDispatchToProps)(LastUsed);
