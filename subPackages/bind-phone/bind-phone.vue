<template>
	<view class="wrapper">
		<view class="bg">
			<text class="iconfont icon-fanhuijiantou left-arrow" @click="back"></text>
		</view>
		<!-- 表单 -->
		<view class="form-container">
			<view class="title">
				<text>绑定手机号</text>
			</view>
			<view class="form-item">
				<view class="input-wrap">
					<text class="iconfont icon-yonghu"></text>
					<input v-model="formModel.phone" type="text" placeholder="请输入手机号">
				</view>
				<view class="input-wrap">
					<text class="iconfont icon-mima"></text>
					<input type="text" placeholder="验证码">
					<view @click="sendCode" class="code-wrap bg-main flex justify-center align-center text-white">
						{{ isSend ? `${count}s` : '发送'}}
					</view>
				</view>
				<view class="bg-main flex justify-center align-center submit rounded text-white">
					绑定
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		navigateTo,
		navigateBack
	} from '@/utils/navigate.js'
	import {
		showToast
	} from '@/utils/showToast.js'
	import {
		ref,
		reactive
	} from 'vue'
	import {
		getVerificationCode
	} from '@/api/phone.js'
	let timer = ref(null)
	let count = ref(59)
	// 表单模型
	const formModel = reactive({
		phone: ''
	})
	// 是否发送验证码
	const isSend = ref(false)
	// 发送验证码
	const sendCode = async () => {
		try {
			const {
				data,
				code
			} = await getVerificationCode(formModel)
			showToast(`验证码：${data}`)
			if (code === 20000) {
				isSend.value = true
				if (isSend.value) {
					countDown()
				}
			}
		} catch (e) {
			//TODO handle the exception
		}
	}
	// 返回
	const back = () => {
		navigateBack()
	}
	// 倒计时
	const countDown = () => {
		console.log(1);
		if (timer.value) {
			clearInterval(timer.value)
		}
		timer.value = setInterval(() => {
			if (count.value <= 0) {
				count.value = 60
				isSend.value = false
				return
			}
			count.value--
		}, 1000)
	}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
	.wrapper {
		height: 100%;
	}

	.bg {
		height: 220rpx;
		background: linear-gradient(to left, #68dbe8, #43f8b9);
		position: relative;

		.left-arrow {
			position: absolute;
			color: #fff;
			font-size: 40rpx;
			top: 30rpx;
			left: 40rpx;
			font-weight: bold;
		}
	}

	.form-container {
		position: relative;
		background: #fff;
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
		margin-top: -40rpx;
		padding: 50rpx 60rpx 0 60rpx;

		.title {
			font-size: 40rpx;
			margin-bottom: 40rpx;
		}

		.form-item {
			.input-wrap {
				width: 600rpx;
				height: 100rpx;
				background: #f4f4f4;
				border-radius: 10rpx;
				margin-bottom: 50rpx;
				display: flex;
				align-items: center;
				padding-left: 30rpx;
				position: relative;

				input {
					margin-left: 30rpx;
				}

				.code-wrap {
					position: absolute;
					right: 0;
					top: 0;
					height: 100%;
					width: 180rpx;
				}
			}

			.submit {
				height: 100rpx;
			}

			.register-container {
				display: flex;
				justify-content: space-between;
				margin-top: 50rpx;

				.forget {
					color: #a9a5a0;
				}
			}
		}
	}
</style>
