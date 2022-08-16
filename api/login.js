import request from '@/utils/request.js'
// 登录
export const loginAPI = (data) => {
	return request('/login', 'POST', data)
}
// 注册
export const registerAPI = (data) => {
	return request('/reg', 'POST', data)
}
