import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Layout from '../components/Layout'



// 路由守卫：检查是否已登录
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('token')
    
    if (!token) {
        // 未登录，重定向到登录页
        return <Navigate to="/login" replace />
    }
    
    return <>{children}</>
}

// 登录页守卫：已登录用户访问登录页时重定向到dashboard
const LoginGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('token')
    
    // 调试信息
    console.log('LoginGuard - token:', token)
    console.log('LoginGuard - token type:', typeof token)
    console.log('LoginGuard - token length:', token?.length)
    
    if (token) {
        console.log('LoginGuard - 检测到token，重定向到dashboard')
        // 已登录，重定向到dashboard
        return <Navigate to="/dashboard" replace />
    }
    
    console.log('LoginGuard - 未检测到token，显示登录页')
    return <>{children}</>
}

// 路由配置
const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
    },
    {
        path: '/login',
        element: (
            <LoginGuard>
                <Login />
            </LoginGuard>
        )
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Layout>
                    <Dashboard />
                </Layout>
            </ProtectedRoute>
        )
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />
    }
], {
    future: {
        v7_startTransition: true
    } as Record<string, boolean>
})

export default router
