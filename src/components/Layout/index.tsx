import React, { useState } from 'react'
import { Layout as AntLayout, Menu, Button, Dropdown, Avatar, Space, message } from 'antd'
import { 
    MenuFoldOutlined, 
    MenuUnfoldOutlined, 
    DashboardOutlined, 
    UserOutlined, 
    SettingOutlined,
    LogoutOutlined,
    BellOutlined
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd'

const { Header, Sider, Content } = AntLayout

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    // 获取用户信息
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

    // 侧边栏菜单项
    const menuItems: MenuProps['items'] = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: '仪表板',
        },
        {
            key: '/users',
            icon: <UserOutlined />,
            label: '用户管理',
        },
        {
            key: '/settings',
            icon: <SettingOutlined />,
            label: '系统设置',
        },
    ]

    // 用户下拉菜单
    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: '个人资料',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '账户设置',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            danger: true,
        },
    ]

    // 处理菜单点击
    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key)
    }

    // 处理用户菜单点击
    const handleUserMenuClick = ({ key }: { key: string }) => {
        switch (key) {
            case 'logout':
                handleLogout()
                break
            case 'profile':
                message.info('个人资料功能开发中...')
                break
            case 'settings':
                message.info('账户设置功能开发中...')
                break
            default:
                break
        }
    }

    // 退出登录
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        message.success('已安全退出')
        navigate('/login')
    }

    return (
        <AntLayout style={{ minHeight: '100vh' }}>
            {/* 侧边栏 */}
            <Sider 
                trigger={null} 
                collapsible 
                collapsed={collapsed}
                className="bg-white shadow-md"
                style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                {/* Logo区域 */}
                <div className="h-16 flex items-center justify-center border-b border-gray-200">
                    <div className="text-xl font-bold text-blue-600">
                        {collapsed ? 'MR' : 'Match React'}
                    </div>
                </div>

                {/* 菜单 */}
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    className="border-r-0"
                />
            </Sider>

            {/* 主要内容区域 */}
            <AntLayout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
                {/* 顶部导航栏 */}
                <Header className="bg-white px-4 shadow-sm flex items-center justify-between" style={{ position: 'fixed', top: 0, right: 0, left: collapsed ? 80 : 200, zIndex: 1000, transition: 'left 0.2s' }}>
                    <div className="flex items-center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-base w-16 h-16"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* 通知铃铛 */}
                        <Button 
                            type="text" 
                            icon={<BellOutlined />} 
                            className="text-gray-600"
                            onClick={() => message.info('暂无新通知')}
                        />

                        {/* 用户信息下拉菜单 */}
                        <Dropdown 
                            menu={{ 
                                items: userMenuItems, 
                                onClick: handleUserMenuClick 
                            }} 
                            placement="bottomRight"
                        >
                            <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded">
                                <Avatar 
                                    size="small" 
                                    icon={<UserOutlined />} 
                                    className="bg-blue-500"
                                />
                                <span className="text-gray-700">
                                    {userInfo.username || '用户'}
                                </span>
                            </Space>
                        </Dropdown>
                    </div>
                </Header>

                {/* 内容区域 */}
                <Content 
                    className="bg-gray-50" 
                    style={{ 
                        marginTop: 64, // Header 的高度
                        minHeight: 'calc(100vh - 64px)',
                        padding: 0,
                        overflow: 'auto'
                    }}
                >
                    {children}
                </Content>
            </AntLayout>
        </AntLayout>
    )
}

export default Layout
