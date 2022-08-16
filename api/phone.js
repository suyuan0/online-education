import request from '@/utils/request.js'

// 获取验证码
export const getVerificationCode = (data)=>{
	return request('/get_captcha','POST',data)
}