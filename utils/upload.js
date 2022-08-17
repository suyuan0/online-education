import {
	getItem
} from '@/utils/storage.js'
import {
	TOKEN
} from '@/utils/constant.js'
const token = getItem(TOKEN) || ''
export const uploadFile = ()=>{
	return new Promise((reslove,rejece)=>{
		uni.uploadFile({
			url:'http://demonuxtapi.dishait.cn/mobile/upload',
			header:{
				token,
				appid: 'bd9d01ecc75dbbaaefce'
			},
			method:"POST"
		})
	})
}