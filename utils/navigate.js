export const navigateTo = (url) => {
	uni.navigateTo({
		url
	})
}

export const navigateBack = (delta = 1) => {
	uni.navigateBack({
		delta,
		animationType: 'pop-in',
	})
}


export const switchTab = (url)=>{
	uni.switchTab({
		url
	})
}