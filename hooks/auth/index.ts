// utils/auth 的 hooks 包装
import { useState, useEffect } from 'react'
import { getUserInfo, getUserAuth } from '@/utils/auth'
import { UserAuth, UserInfo } from '@/utils/auth/types'

export function useUserAuth() {
  const [auth, setAuth] = useState<UserAuth>({ menus: [], auths: [] })

  useEffect(() => {
    getUserAuth().then(data => setAuth(data))
  }, [])

  return auth
}
