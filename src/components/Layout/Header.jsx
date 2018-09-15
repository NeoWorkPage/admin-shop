import React from 'react';
import { Layout } from 'antd';

import b from 'helpers/b_';

const { Header } = Layout;
const header = b.lock('header');

class HeaderApp extends React.Component {
  render() {
    return (
      <Header className={header()}>
        header
      </Header>
    );
  }
}

export default HeaderApp;
