import React from 'react';
import { Switch, Route } from 'react-router-dom';

const RoutesConfig = () => (
  <Switch>
    <Route exact path="/" component={() => <div>123123</div>} />
    <Route path="*" component={() => <h1 style={{ textAlign: 'center' }}>404 NOT Found</h1>} />
  </Switch>
);

export default RoutesConfig;
