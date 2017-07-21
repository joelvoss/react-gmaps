import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import globalStore from './reducer';
import registerServiceWorker from './registerServiceWorker';

// Global styles
import './global-styles.css';
import theme from './theme';

// Components & Container
import Root from 'container/Root';

// Polyfills
require('smoothscroll-polyfill').polyfill();

// create redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(globalStore, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
