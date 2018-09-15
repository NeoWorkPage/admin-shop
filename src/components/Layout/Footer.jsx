import React from 'react';
import { Layout } from 'antd';

import b from 'helpers/b_';

const { Footer } = Layout;
const footer = b.lock('footer');

class FooterApp extends React.Component {
  render() {
    return <Footer className={footer()}>Shop Admin</Footer>;
  }
}

export default FooterApp;
