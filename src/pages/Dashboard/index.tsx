import React from 'react'
import { Card, Row, Col, Statistic, Typography, Button, Space } from 'antd'
import { UserOutlined, TeamOutlined, ShoppingOutlined, DollarOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

const Dashboard: React.FC = () => {
    // 获取用户信息
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

    return (
        <div className="p-6 min-h-full">
            {/* 欢迎区域 */}
            <div className="mb-6">
                <Title level={2}>欢迎回来，{userInfo.username || '用户'}！</Title>
                <Paragraph className="text-gray-600">
                    这是您的工作台，您可以在这里查看系统概览和快速操作。
                </Paragraph>
            </div>

            {/* 统计卡片 */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="总用户数"
                            value={1128}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="活跃用户"
                            value={893}
                            prefix={<TeamOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="订单总数"
                            value={2456}
                            prefix={<ShoppingOutlined />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="总收入"
                            value={98765}
                            prefix={<DollarOutlined />}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            suffix="元"
                        />
                    </Card>
                </Col>
            </Row>

            {/* 快速操作 */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card title="快速操作" style={{ height: '100%' }}>
                        <Space direction="vertical" size="middle" className="w-full">
                            <Button type="primary" size="large" className="w-full">
                                创建新项目
                            </Button>
                            <Button size="large" className="w-full">
                                查看报表
                            </Button>
                            <Button size="large" className="w-full">
                                用户管理
                            </Button>
                            <Button size="large" className="w-full">
                                系统设置
                            </Button>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="最近活动" style={{ height: '100%' }}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div>
                                    <div className="font-medium">用户登录</div>
                                    <div className="text-sm text-gray-500">2分钟前</div>
                                </div>
                                <div className="text-green-500">成功</div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div>
                                    <div className="font-medium">数据备份</div>
                                    <div className="text-sm text-gray-500">1小时前</div>
                                </div>
                                <div className="text-blue-500">完成</div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div>
                                    <div className="font-medium">系统更新</div>
                                    <div className="text-sm text-gray-500">3小时前</div>
                                </div>
                                <div className="text-orange-500">进行中</div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
