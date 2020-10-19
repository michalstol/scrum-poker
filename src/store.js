import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

// import main reducers
import rootReducer from './reducers';

// import reducers 
import { initAuthState } from './reducers/auth-reducers';
import { initRoleState } from './reducers/role-reducers';
import { initResultsState } from './reducers/results-reducers';
import { initVotedState } from './reducers/voted-reducers';

const initState = {
    ...initAuthState,
    ...initRoleState,
    ...initResultsState,
    ...initVotedState
};

const middleware = [promise, ReduxThunk, logger];

const store = createStore(
    rootReducer,
    initState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;