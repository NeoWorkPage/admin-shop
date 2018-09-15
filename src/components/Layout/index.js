import React from 'react';
import { Layout } from 'antd';

import b from 'helpers/b_';
import SiderApp from './Sider';
import HeaderApp from './Header';
import FooterApp from './Footer';
import RoutesConfig from '../RoutesConfig';

import './css/Layout.css';

const { Content } = Layout;
const layout = b.lock('layout');

class LayoutApp extends React.Component {

  render() {
    return (
      <Layout className={layout('wrapper')}>
        <SiderApp />
        <Layout className={layout()} style={{ marginLeft: 200 }}>
          <HeaderApp />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <RoutesConfig />
          </Content>
          <FooterApp />
        </Layout>
      </Layout>
    );
  }
}

export default LayoutApp;
