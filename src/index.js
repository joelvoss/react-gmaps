import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import globalStore from './reducer';

import Root from './container/Root';
import './global-styles';
//import registerServiceWorker from './registerServiceWorker';

// create redux store
const store = createStore(globalStore)

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>, document.getElementById('root'));
//registerServiceWorker();
