import { useMemo, useState } from 'react'
import { Link } from 'umi'
import { Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { useUserAuth } from '@/hooks/auth'
import { routes } from '@/routes'

const { SubMenu } = Menu

export default function SideMenu() {
  const auth = useUserAuth()
  // TODO: selectedKeys, openKeys 根据路由还原默认值
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['/'])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  // 递归拼接子菜单的路径
  const splicingRoutesPath = (_routes: typeof routes, ancestors: typeof routes = []) => {
    return _routes.map(route => {
      if (ancestors.length) {
        route.path = ancestors.concat(route).map(e => e.path).join('/')
        console.log(route.path)
      }
      if (route.routes) {
        route.routes = splicingRoutesPath(route.routes, ancestors.concat(route))
      }
      return route
    })
  }

  const menus = useMemo<typeof routes>(() => {
    if (!auth.menus.length) return []
    // 映射 layout-main 下的菜单
    const layoutMain = routes.find(r => r.auth === 'layout-main')
    if (!layoutMain?.routes) return []

    const filterRoutes = (_routes: typeof routes) => {
      return _routes.filter(route => {
        if (route.hide) {
          return false
        }
        if (!(route.auth && auth.menus.includes(route.auth))) {
          if (route.routes?.length) {
            // 如果其子菜单有权限，则依然放开该菜单显示
            return true
          }
          return false
        }
        return true
      })
    }
    const list = layoutMain.routes.map(function mapRoutes(route) {
      if (route.routes?.length) {
        if (route.auth && auth.menus.includes(route.auth)) {
          // 如果当前菜单有权限，忽略子菜单判断
          return route
        }
        // 校验子菜单
        route.routes = filterRoutes(route.routes.map(mapRoutes))
      }
      return route
    })

    return splicingRoutesPath(filterRoutes(list))
  }, [auth])

  return (
    <Menu
      mode='inline'
      selectedKeys={selectedKeys}
      openKeys={openKeys}
    >
      {menus.map(function mapMenu(menu, idx1) {
        const key1 = `${idx1}-${menu.path}`
        return menu.routes
          ?
          <SubMenu
            key={key1}
            icon={<MenuOutlined />}
            title={menu.title || `未命名组-${menu.path}`}
            onTitleClick={ev => setOpenKeys(openKeys[0] === ev.key ? [] : [ev.key])}
          >
            {menu.routes.map(mapMenu)}
          </SubMenu>
          :
          <Menu.Item
            key={key1}
            onClick={() => setSelectedKeys([key1])}
          >
            <Link to={menu.path}>{menu.title}</Link>
          </Menu.Item>
      })}
    </Menu>
  )
}
