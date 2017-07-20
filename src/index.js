import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import globalStore from './reducer';
import registerServiceWorker from './registerServiceWorker';

// Global styles
import './global-styles.css';

// Components & Container
import Root from 'container/Root';

// Polyfills
require('smoothscroll-polyfill').polyfill();

// create redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(globalStore, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
