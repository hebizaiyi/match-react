import HttpRequest from "@/utils/request";

/**
 * 系统Api
 */

// 登录请求数据类型
interface LoginRequest {
    username: string;
    password: string;
}

// 登录响应数据类型
export interface LoginResponse {
    code: number;
    data: {
        id: number;
        username: string;
        email: string;
        token: string;
    };
    msg: string;
}

// 登录功能
export const login = (data: LoginRequest) => {
    return HttpRequest.post<LoginResponse>('/api/login', data);
};