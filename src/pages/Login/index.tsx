import { Form, Input, Button } from 'antd'

const Login: React.FC=()=> {
    const [form] = Form.useForm()
    const onFinish = (values: any) => {
        console.log(values)
    }
    return <div className="w-full h-full flex align-center justify-center bg-blue-600">
        <div className="flex flex-col ">
              <div>XXX平台</div>      
              <div>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="账号" name="username" rules={[{ required: true, message: "请输入账号" }]}><Input /></Form.Item>
                    <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]}><Input.Password /></Form.Item>
                    <Form.Item><Button type="primary" htmlType="submit">登录</Button></Form.Item>
                </Form>

              </div>
        </div>
    </div>
}


export default Login