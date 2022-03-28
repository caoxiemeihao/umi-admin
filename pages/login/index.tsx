import { history } from 'umi'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import cls from 'classnames'
import { LoginValues, PhoneValues } from './types'
import style from './index.less'
import useQuery from '@/hooks/useQuery'

export default function Login() {
  const query = useQuery()
  const [form] = Form.useForm()
  const onFinish = (values: LoginValues) => {
    console.log('Success:', values)
    if (!(values.username === 'admin' && values.password === 'admin')) {
      message.warn('用户名: admin | 密码: admin')
      return
    }
    sessionStorage.setItem('userinfo', JSON.stringify(values))
    if (query.redirect) {
      // 如果是一些页面中登录信息失效进入登录页面，登录有原路返回
      history.push(query.redirect)
    } else {
      history.push('/')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={cls(style.loginBox, 'd-flex justify-content-center align-items-center')}>
      <Form
        name='login-form'
        initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
      <h1 className='text-center'>
        大哥吃油条 🥖
      </h1>
        <Form.Item
          name='username'
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder='用户名'
          />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder='密码'
            autoComplete='on'
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>记住用户</Checkbox>
          </Form.Item>

          <a style={{ float: 'right' }} href="">
            忘记密码
          </a>
        </Form.Item>

        <div className='text-center'>
          <Button type='primary' block htmlType='submit'>
            登录
          </Button>
        </div>
      </Form>
    </div>
  )
}
