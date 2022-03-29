
export interface UserInfo {
  username: string
  phone: string
}

export interface UserAuth {
  /** 菜单权限 */
  menus: string[]
  /** 数据权限 - 如果按钮操作控制，敏感数据展示隐藏 */
  auths: string[]
}
