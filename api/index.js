import request from '../utils/request'

// 获取主页数据
export const getIndexDataAPI = () => {
	return request('/index')
}

// 优惠券列表
export const couponAPI = () => {
	return request('/coupon')
}

// 拼团列表
export const doughAPI = (page) => {
	return request('/group', 'GET', {
		page
	})
}
