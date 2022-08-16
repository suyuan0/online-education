export const showToast = (msg, icon = 'none') => {
	uni.showToast({
		title: msg,
		icon
	})
}
