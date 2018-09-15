import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const RoutesConfig = () => (
  <Switch>
    <Route exact path="/" component={<div>123123</div>} />
    <Route path="/login" component={() => <Redirect to={{ pathname: '/' }} />} />
    <Route path="*" component={() => <h1 style={{ textAlign: 'center' }}>404 NOT Found</h1>} />
  </Switch>
);

export default RoutesConfig;
