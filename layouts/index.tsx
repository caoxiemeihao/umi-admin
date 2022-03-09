import { Link, Outlet } from 'umi';
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './index.less';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default function AppLayout() {
  return (
    <Layout className="app-layout">
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout className="layout-side">
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1">
              <Link to="/">首页</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<MenuOutlined />} title="菜单组">
              <Menu.Item key="2">
                <Link to="/docs">文档</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
