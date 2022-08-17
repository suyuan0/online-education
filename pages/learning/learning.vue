<template>
	<view class="wrap">
		<!-- header -->
		<view class="header text-center font-weight-bold font-md">
			学习进度
		</view>
		<view class="not-logged-in flex flex-column align-center justify-center">
			<image src="../../static/noLogin.png"></image>
			<text>登陆后才可以查看我的学习噢</text>
			<button size="mini" plain>立即登录</button>
		</view>
	</view>
</template>

<script setup>
	import {getItem} from '@/utils/storage.js'
	import {TOKEN} from '@/utils/constant.js'
	
</script>

<style lang="scss">
	.wrap {
		padding: 20rpx;
		height: 100%;
		.not-logged-in {
			height: 100%;
			image {
				width: 350rpx;
				height: 350rpx;
			}
			text{
				color: #6c757d;
				margin: 20rpx 0;
			}
		}
	}
</style>
