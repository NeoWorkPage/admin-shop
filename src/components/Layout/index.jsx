import React from 'react';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import classname from 'classnames';

import b from 'helpers/b_';
import SiderApp from './Sider';
import HeaderApp from './Header';
import FooterApp from './Footer';
import RoutesConfig from '../RoutesConfig';

import './css/Layout.css';

const { Content } = Layout;
const layout = b.lock('layout');

@inject('siderStore')
@observer
class LayoutApp extends React.Component {
  render() {
    const { siderStore } = this.props;
    const classNameWrapper = classname(layout(), {
      layout_active: siderStore.collapsed,
    });

    return (
      <Layout className={layout('wrapper')}>
        <SiderApp />
        <Layout className={classNameWrapper}>
          <HeaderApp />
          <Content className={layout('content')}>
            <RoutesConfig />
          </Content>
          <FooterApp />
        </Layout>
      </Layout>
    );
  }
}

export default LayoutApp;
