<template>
	<view class="wrapper">
		<view class="bg">
			<text class="iconfont icon-fanhuijiantou left-arrow" @click="back"></text>
		</view>
		<!-- 表单 -->
		<view class="form-container">
			<view class="title">
				<text>{{ registerShow ? '注 册':'登 录'}}</text>
			</view>
			<view class="form-item">
				<view class="input-wrap">
					<text class="iconfont icon-yonghu"></text>
					<input v-model="formModel.username" type="text" placeholder="请输入用户名">
				</view>
				<view class="input-wrap">
					<text class="iconfont icon-mima"></text>
					<input v-model="formModel.password" type="password" placeholder="请输入密码">
				</view>
				<view v-if="registerShow" class="input-wrap">
					<text class="iconfont icon-mima"></text>
					<input v-model="formModel.repassword" type="password" placeholder="请输入确认密码密码">
				</view>
				<view @click="handlerSubmit" class="bg-main flex justify-center align-center submit rounded text-white">
					{{ registerShow ?'注册':'登录'}}
				</view>
				<view class="register-container">
					<text class="register text-main" @click="registerShow=!registerShow;isCheck=false">
						{{registerShow ? '去登陆' :'注册账号'}}
					</text>
					<text class="forget">忘记密码?</text>
				</view>
				<view class="wx-icon">
					<text class="iconfont icon-weixin text-main"></text>
				</view>
				<view v-if="!registerShow" class="check-box">
					<checkbox-group @change="handleChangeBox">
						<label>
							<checkbox value="1" /><text>已阅读并同意用户协议&隐私声明</text>
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		TOKEN,
		USERINFO
	} from '@/utils/constant.js'
	import {
		setItem
	} from '@/utils/storage.js'
	import {
		showToast
	} from '@/utils/showToast.js'
	import {
		loginAPI,
		registerAPI
	} from '@/api/login'
	import {
		navigateBack,
		navigateTo,
		switchTab
	} from '@/utils/navigate.js'
	import {
		ref,
		reactive
	} from 'vue'
	// 表单数据
	const formModel = reactive({
		username: "",
		password: '',
		repassword: ''
	})
	// 是否勾选
	const isCheck = ref(false)
	// 是否注册
	const registerShow = ref(false)
	// 提交
	const handlerSubmit = async () => {
		await registerShow.value ? handlerRegister() : handlerLogin()
	}
	// 6666666666666  777777777
	// 登录
	const handlerLogin = async () => {
		try {
			if (!isCheck.value) return showToast('请先阅读并同意用户协议&隐私声明')
			const res = await loginAPI(formModel)
			setInfo(res.data.token, res.data)
			showToast('登录成功')
			if (res.data.phone) {
				switchTab('/pages/my/my')
			} else {
				navigateTo('/subPackages/bind-phone/bind-phone')
			}
		} catch (e) {
			//TODO handle the exception
		}
	}
	// 注册
	const handlerRegister = async () => {
		try {
			const {
				code,
				msg,
				data
			} = await registerAPI(formModel)
			if (msg === 'ok') showToast('注册成功')
			emptyForm()
			registerShow.value = false
		} catch (e) {
			//TODO handle the exception
		}
	}
	// 清空表单
	const emptyForm = () => {
		for (const key in formModel) {
			formModel[key] = ''
		}
	}
	// 修改选中状态
	const handleChangeBox = (e) => {
		const value = e.detail.value
		isCheck.value = value.length > 0
	}
	// 返回
	const back = () => {
		navigateBack()
	}
	// 存储token & 用户信息
	const setInfo = (token, info) => {
		setItem(TOKEN, token)
		setItem(USERINFO, info)
	}
</script>

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

				input {
					margin-left: 30rpx;
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

			.wx-icon {
				display: flex;
				justify-content: center;
				margin: 50rpx 0 40rpx 0;

				text {
					font-size: 130rpx;
				}
			}

			.check-box {
				display: flex;
				justify-content: center;
				align-items: center;

				text {
					margin-left: 10rpx;
					font-size: 30rpx;
					color: #a9a5a0;
				}
			}
		}
	}
</style>
