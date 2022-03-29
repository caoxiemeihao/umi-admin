import { Outlet, useLocation, history } from 'umi'
import { Layout, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getUserInfo } from '@/utils/auth'
import SideMenu from './side'
import './index.less'

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
        <Layout className='app-layout-side'>
          <Sider className='bg-white' width={200}>
            <SideMenu />
          </Sider>
          <Content className='app-layout-content'>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    )
}
