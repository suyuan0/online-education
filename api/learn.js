import request from '@/utils/request.js'

// 学习进度
export const rateOfLearningAPI = (data) => {
	return request('/user_history/list', 'GET', data)
}
