import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Login from '../Login';
import Layout from '../Layout';

import './css/App.css';

@inject('commonStore')
@observer
class App extends Component {
  componentWillMount() {
    const { commonStore } = this.props;
    if (!commonStore.accessToken) {
      commonStore.setRefreshToken();
    }
  }

  render() {
    const { commonStore } = this.props;
    const authenticated = !!commonStore.refreshToken;
    return (
      <React.Fragment>
        {authenticated ? (
          <Layout />
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="*" component={() => <Redirect to={{ pathname: '/login' }} />} />
          </Switch>
        )}
      </React.Fragment>
    );
  }
}

export default App;
