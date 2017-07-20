import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import globalStore from './reducer';
import registerServiceWorker from './registerServiceWorker';

// Global styles
import './global-styles.css';

// Components & Container
import Root from './container/Root';

// Polyfills
require('smoothscroll-polyfill').polyfill();

// create redux store
const store = createStore(globalStore)

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
