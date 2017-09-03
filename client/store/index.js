import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Map } from 'immutable';
import reducers from './reducers';
import repositoryLocalStorage from './middlewares/repositoryLocalStorage';
import { loadLastUsedRepositories } from './actions/repository';

export const initStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middlewares = [thunk, repositoryLocalStorage];

    const store = createStore(
        reducers,
        new Map(),
        composeEnhancers(applyMiddleware(...middlewares)),
    );

    store.dispatch(loadLastUsedRepositories());

    return store;
};
