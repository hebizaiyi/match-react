import axios from "axios"
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { message } from "antd"

interface ApiResponse<T = any> {
    code: number
    data: T
    message: string
}

// 获取token的工具函数
const getToken = (): string | null => {
    return localStorage.getItem('token') || sessionStorage.getItem('token')
}

// 清除token的工具函数
const clearToken = (): void => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
}

const HttpRequest: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})

// 请求拦截器
HttpRequest.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        }
    }
    return config
}, (error: AxiosError) => {
    message.error('请求配置错误')
    return Promise.reject(error)
})

// 响应拦截器
HttpRequest.interceptors.response.use((response: AxiosResponse<ApiResponse>) => {
    const { code, data, message: responseMessage } = response.data
    console.log('data request',data)
    switch (code) {
        case 200:
        case 0: // 有些接口可能使用 0 表示成功
            return data
        case 401:
            // 未授权，清除token并跳转到登录页
            message.error('登录已过期，请重新登录')
            clearToken()
            // 可以在这里添加跳转到登录页的逻辑
            // window.location.href = '/login'
            return Promise.reject(new Error('未授权访问'))
        case 403:
            message.error('权限不足，无法访问该资源')
            return Promise.reject(new Error('权限不足'))
        case 404:
            message.error('请求的资源不存在')
            return Promise.reject(new Error('资源不存在'))
        case 500:
            message.error('服务器内部错误，请稍后重试')
            return Promise.reject(new Error('服务器错误'))
        default:{
            // 显示服务端返回的错误信息
            const errorMsg = responseMessage || '请求失败'
            message.error(errorMsg)
            return Promise.reject(new Error(errorMsg))
        }
    }
}, (error: AxiosError) => {
    // 网络错误或其他axios错误处理
    let errorMessage = '请求错误'
    
    if (error.response) {
        // 服务器响应了错误状态码
        const { status } = error.response
        switch (status) {
            case 400:
                errorMessage = '请求参数错误'
                break
            case 401:
                errorMessage = '登录已过期，请重新登录'
                clearToken()
                break
            case 403:
                errorMessage = '权限不足'
                break
            case 404:
                errorMessage = '请求的接口不存在'
                break
            case 500:
                errorMessage = '服务器内部错误'
                break
            case 502:
                errorMessage = '网关错误'
                break
            case 503:
                errorMessage = '服务不可用'
                break
            case 504:
                errorMessage = '网关超时'
                break
            default:
                errorMessage = `请求失败 (${status})`
        }
    } else if (error.request) {
        // 请求已发出但没有收到响应
        errorMessage = '网络连接超时，请检查网络设置'
    } else {
        // 其他错误
        errorMessage = error.message || '请求配置错误'
    }
    
    message.error(errorMessage)
    return Promise.reject(error)
})

export default HttpRequest