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
				appId: "bd9d01ecc75dbbaaefce"
			},
			timeout:5000,
			success({
				statusCode,
				data
			}) {
				if (statusCode === 200) {
					{
						reslove(data)
					}
				}
			},
			fail(err) {
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}

export default request
