
export interface LoginValues {
  username: string
  password: string
  remember: boolean
}

export interface PhoneValues {
  phone: string
  /** 验证码 */
  Captcha: string
}
