import ReactDOM from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import App from './components/App/index';

import authStore from './stores/authStore';
import commonStore from './stores/commonStore';
import siderStore from './stores/layout/sider';

const CONTEXT_ROOT = process.env.REACT_APP_CONTEXT_ROOT;

const stores = {
  authStore,
  commonStore,
  siderStore,
};

// For easier debugging
window._____APP_STATE_____ = stores; // eslint-disable-line

promiseFinally.shim();
configure({ enforceActions: 'observed' });

ReactDOM.render((
  <Provider {...stores}>
    <Router basename={`/${CONTEXT_ROOT}`}>
      <App />
    </Router>
  </Provider>), document.getElementById('root'));
