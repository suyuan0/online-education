<template>
	<view class="wrapper">
		<view class="bg">
			<text class="iconfont icon-fanhuijiantou left-arrow" @click="back"></text>
		</view>
		<!-- 表单 -->
		<view class="form-container">
			<view class="title">
				<text>登 录</text>
			</view>
			<view class="form-item">
				<view class="input-wrap">
					<text class="iconfont icon-yonghu"></text>
					<input type="text" placeholder="请输入用户名">
				</view>
				<view class="input-wrap">
					<text class="iconfont icon-mima"></text>
					<input type="text" placeholder="请输入密码">
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		navigateBack
	} from '@/utils/vavigate.js'
	// 返回
	const back = () => {
		navigateBack()
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
		.title{
			font-size: 40rpx;
		}
	}
</style>
