<template>
	<view class="wrap">
		<!-- 头 -->
		<view class="header">
			<text @click="navigateBack()" class="iconfont icon-fanhuijiantou"></text>
			<text class="setting">我的设置</text>
		</view>
		<view class="main">
			<view  @click="accountSecurity" class="item">
				<text>账户安全</text>
				<text class="iconfont icon-jiantou"></text>
			</view>
			<view class="item" @click="clearCache">
				<text>清除缓存</text>
				<text>{{cache.toFixed(2)}}KB</text>
			</view>
			<view class="item">
				<text>检查更新</text>
				<text class="iconfont icon-jiantou"></text>
			</view>
			<view class="item">
				<text>当前版本</text>
				<text>1.0.0</text>
			</view>
			<view v-if="getItem(USERINFO)" @click="handlerLogout" class="btn bg-main text-white rounded">
				退出登录
			</view>
		</view>
		<!-- 弹框 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog @confirm="handlerConfirm" cancelText="取消" confirmText="确定" :content="'是否要' +  title+'？'">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		getItem,
		getStorageInfo,
		clear
	} from '@/utils/storage.js'
	import {
		USERINFO
	} from '@/utils/constant.js'
	import {
		ref,
		computed
	} from 'vue'
	import {
		showToast
	} from '@/utils/showToast.js'
	import {
		switchTab,navigateTo,navigateBack
	} from '@/utils/navigate.js'
	const alertDialog = ref(null)
	// 缓存数据
	const cache = ref(0)
	const getCache = async () => {
		const res = await getStorageInfo()
		cache.value = res.currentSize
	}
	getCache()
	const title = ref('')
	// 清楚缓存
	const clearCache = () => {
		title.value = '清除缓存'
		alertDialog.value.open()
	}
	// 退出登录
	const handlerLogout = () => {
		title.value = '退出登录'
		alertDialog.value.open()
	}
	const exit = () => {
		clear()
		showToast('拜拜')
		switchTab('/pages/index/index')
	}
	const handlerConfirm = () => {
		title.value === '退出登录' ? exit() : showToast('清除缓存成功')
	}
	// 账户安全
	const accountSecurity = ()=>{
		if(!getItem(USERINFO)){
			navigateTo('/subPackages/login/login')
		}
	}
</script>

<style scoped lang="scss">
	.header {
		position: relative;
		padding: 20rpx;
		font-size: 33rpx;
		font-weight: bold;

		.setting {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.main {

		.item {
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30rpx;
			padding: 0 20rpx;

			&:nth-child(2):active {
				background: #f1f1f1;
			}
		}

		.btn {
			margin: 20rpx 20rpx 0 20rpx;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
