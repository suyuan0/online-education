// 存储数据
export const setItem = (key, value) => {
	uni.setStorageSync(key, value)
}

// 获取数据
export const getItem = (key) => {
	return uni.getStorageSync(key)
}

// 删除单条数据
export const removeItem = (key) => {
	uni.removeStorageSync(key)
}

// 清空所有数据
export const clear = () => {
	uni.clearStorageSync()
}

// 异步获取本地数据
export const getStorageInfo = () => {
	return new Promise((reslove, reject) => {
		uni.getStorageInfo({
			success(res) {
				reslove(res)
			}
		})
	})
}
