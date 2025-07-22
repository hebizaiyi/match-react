import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import router from './router'
import './App.css'

// 全局样式配置
const theme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
  },
}

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
