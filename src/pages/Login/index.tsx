import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import HttpRequest from '../../utils/request'
import { login } from '@/api/sys'
const { Title } = Typography

// 登录表单数据类型
interface LoginFormData {
    username: string
    password: string
}



const Login: React.FC = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // 登录提交处理
    const onFinish = async (values: LoginFormData) => {
        setLoading(true)
        try {
            // 调用登录接口
            const response = await login({
                username: values.username,
                password: values.password
            })
            console.log('response', response)
            // 保存token和用户信息到本地存储
            // 响应拦截器已经返回了 data 部分，所以 response 就是后端的 data
            localStorage.setItem('token', response.token)
            localStorage.setItem('userInfo', JSON.stringify({
                id: response.id,
                username: response.username,
                email: response.email
            }))

            message.success('登录成功！')
            
            // 跳转到首页或仪表板
            navigate('/dashboard')
        } catch (error: unknown) {
            // 错误处理已在响应拦截器中处理，这里可以做额外处理
            console.error('登录失败:', error)
        } finally {
            setLoading(false)
        }
    }

    // 登录失败处理
    const onFinishFailed = (errorInfo: any) => {
        console.log('表单验证失败:', errorInfo)
        message.error('请检查输入信息')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
            <Card 
                className="w-full max-w-md shadow-2xl"
                style={{ borderRadius: '12px' }}
            >
                <div className="text-center mb-8">
                    <Title level={2} className="text-gray-800 mb-2">
                        欢迎登录
                    </Title>
                    <Title level={4} className="text-gray-500 font-normal">
                        Match React 平台
                    </Title>
                </div>

                <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    size="large"
                    layout="vertical"
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[
                            { required: true, message: '请输入账号' },
                            { min: 3, message: '账号长度至少3位' }
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="请输入账号"
                            autoComplete="username"
                        />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码' },
                            { min: 6, message: '密码长度至少6位' }
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="请输入密码"
                            autoComplete="current-password"
                        />
                    </Form.Item>

                    <Form.Item className="mb-4">
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={loading}
                            className="w-full h-12 text-base font-medium"
                            style={{ borderRadius: '8px' }}
                        >   
                            {loading ? '登录中...' : '登录'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login