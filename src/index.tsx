import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './reducer/reducer';
import {AuthorizationStatuses} from './types';
import {ActionCreator as UserActionCreator} from './reducer/user/user';

import {createAPI} from './api';

import App from './components/app/app';

// Выносим код в отдельную функцию, чтобы развязать циклическую зависимость:
// 'store' зависит от 'api', а 'api' зависит от 'store'.
const onUnauthorized = () => {
  store.dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatuses.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunk.withExtraArgument(api)
        )
    )
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
