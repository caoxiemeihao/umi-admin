// 该文件应该包含登录校验、菜单权限等逻辑
import { UserInfo } from './types'

export function getUserInfo(): UserInfo | undefined {
  const tmp = sessionStorage.getItem('userinfo')
  if (tmp) {
    try {
      return JSON.parse(tmp)
    } catch (error) { }
  }
}
