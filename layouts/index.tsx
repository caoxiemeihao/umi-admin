import { Link, Outlet, useLocation, history } from 'umi'
import { Layout, Menu, Popover } from 'antd'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import { getUserInfo } from '@/utils/auth'
import './index.less'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


export default function AppLayout() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const userInfo = getUserInfo()

  const clickLogout = () => {
    sessionStorage.removeItem('userinfo')
    history.push('/login')
  }

  const UserCenter = (
    <div>
      <a onClick={clickLogout}>退出登录</a>
    </div>
  )

  return isLoginPage
    ? <Outlet />
    : (
      <Layout className="app-layout">
        <Header className="header">
          <div className="d-flex justify-content-between">
            <h2 className='m-0'>🥖</h2>
            <Popover
              title='个人中心'
              trigger='hover'
              content={UserCenter}
            >
              <div className='user-center cursor-pointer text-center'>
                <UserOutlined />
                <span className="ml-2">{userInfo?.username || '请登录'}</span>
              </div>
            </Popover>
          </div>
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
    )
}
