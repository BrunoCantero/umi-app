import React from 'react';
import { Layout, Icon, Typography } from 'antd';
import { formatMessage } from 'umi-plugin-locale';

import MainMenu from '../../components/MainMenu';

import styles from './styles.less';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

class DashboardLayout extends React.Component {
  state = {
    collapsed: false,
    broken: false,
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  }

  handleBreakpoint = broken => this.setState({ broken });

  handleCollapse = (collapsed, type) => {
    const { broken } = this.state;
    if (type === 'responsive') this.setState({ collapsed });
    if (type === 'menu' && broken) this.setState({ collapsed });
  }

  render() {
    const { collapsed, broken } = this.state;
    const { children, route, location } = this.props;
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth={broken ? 0 : undefined}
          trigger={null}
          onBreakpoint={this.handleBreakpoint}
          onCollapse={this.handleCollapse}
          collapsible
          collapsed={collapsed}
        >
          <div className={styles.logo}>
            <Icon type="environment" />
            {!collapsed && <Text className={styles.title} strong>{formatMessage({ id: 'title.app' })}</Text>}
          </div>
          <MainMenu route={route} location={location} onCollapse={this.handleCollapse} />
        </Sider>
        <Layout className={styles.container}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content className={styles.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DashboardLayout;
