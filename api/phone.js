import request from '@/utils/request.js'

// 获取验证码
export const getVerificationCode = (data) => {
	return request('/get_captcha', 'POST', data)
}

// 绑定手机号
export const bindMobilePhone = (data) => {
	return request('/bind_mobile', 'POST', data)
}
