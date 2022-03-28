import { history } from 'umi'
import { getUserInfo } from '@/utils/auth'
import './styles/bootstrap-partial.less'

export function onRouteChange({ location, routes, action }) {
  const userInfo = getUserInfo()
  if (!userInfo && location.pathname !== '/login') {
    // 登录校验
    history.push('/login')
  }
}
