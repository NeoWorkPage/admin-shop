import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Row } from 'antd';

import b from 'helpers/b_';
import LoginWithPassword from './LoginWithPassword';

import './css/index.css';

const login = b.lock('login');

@inject('authStore', 'commonStore')
@withRouter
@observer
class Login extends React.Component {
  render() {
    return (
      <Row type="flex" align="middle" justify="space-around" className={login()}>
        <div className={login('wrapper')}>
          <LoginWithPassword />
        </div>
      </Row>
    );
  }
}

export default Login;
