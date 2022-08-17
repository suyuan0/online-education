import {
	getItem
} from '@/utils/storage.js'
import {
	TOKEN
} from '@/utils/constant.js'
// 获取token
const token = getItem(TOKEN) || ''
const baseURL = 'http://demonuxtapi.dishait.cn/mobile'
const request = (url, method = 'GET', data = {}) => {
	uni.showLoading({
		title: "加载中..."
	})
	return new Promise((reslove, reject) => {
		uni.request({
			url: baseURL + url,
			method,
			data,
			header: {
				appId: "bd9d01ecc75dbbaaefce",
				token: token
			},
			timeout: 5000,
			success({
				statusCode,
				data
			}) {
				_endLoading()
				if (statusCode !== 200) return _showErrorMsg(data.data)
				if (statusCode === 200) {
					reslove(data)
				}
			},
			fail(err) {
				reject(new Error(err))
				_endLoading()
			},

		})
	})
}

// 失败信息处理
const _showErrorMsg = (msg) => {
	if (msg.includes('China Phone Number')) msg = '请输入正确的手机号'
	uni.showToast({
		icon: 'none',
		title: _ErrMsg[msg] || msg
	})
}

// 关闭loading
const _endLoading = () => uni.hideLoading()

// 失败信息
const _ErrMsg = {
	'[`密码`、`确认密码`] 参数必须是相等的': '两次密码不一致'
}

export default request
