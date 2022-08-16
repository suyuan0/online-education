<template>
	<!-- 标题导航 -->
	<view class="title-nav bg-main">
		<text class="title">我的</text>
		<text class="iconfont icon-gengduo"></text>
	</view>
	<!-- 顶部 -->
	<view class="header bg-main animate__animated animate__fadeInDown">

		<!-- 头像 -->
		<view class="info" @click="handleGoLogin" >
			<view class="avatar">
				<image src="http://upload.9yuecloud.com:8887/upload/yhlx4DRQSGzLI8Up31srHrH4.JPG" mode="widthFix">
				</image>
			</view>
			<view class="content">
				<text>立即登录</text>
				<text class="con-2">登录解锁更多功能</text>
			</view>
		</view>
		<!-- 导航 -->
		<view class="icon-nav">
			<view class="content">
				<view class="item" v-for="item in iconsList" :key="item.id">
					<text class="iconfont icon" :class="item.icon"></text>
					<text class="title">{{item.title}}</text>
				</view>
			</view>
		</view>
	</view>
	<!-- 主区域 -->
	<view class="main animate__animated animate__fadeInDown">
		<view class="item" v-for="item in myList" :key="item.id">
			<view class="left">
				<text class="iconfont icon" :class="item.icon"></text>
				<text class="title">{{item.title}}</text>
			</view>
			<view class="right">
				<text class="iconfont icon-jiantou rightArrow"></text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		iconsList,
		myList
	} from './options.js'
	import {navigateTo} from '@/utils/vavigate.js'
	const handleGoLogin = ()=>{
		navigateTo('/subPackages/login/login')
	}
</script>

<style lang="scss">
	.title-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 70rpx;
		color: #fff;
		padding: 0 20rpx;
		z-index: 1000;
		position: relative;
		.title {
			font-size: 40rpx;
			font-weight: bold;
		}
	}

	.header {
		height: 430rpx;
		border-bottom-left-radius: 100rpx;
		border-bottom-right-radius: 100rpx;
		position: relative;
		padding-top: 50rpx;
		box-sizing: border-box;
		.info {
			padding-left: 50rpx;
			height: 125rpx;
			display: flex;
			align-items: center;

			.avatar {
				box-sizing: border-box;
				border-radius: 50%;
				overflow: hidden;
				border: 1px solid #fff;
				width: 125rpx;
				height: 125rpx;

				image {
					width: 100%;
				}
			}

			.content {
				margin-left: 40rpx;
				color: #fff;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.con-2 {
					font-size: 20rpx;
				}
			}
		}

		.icon-nav {
			display: flex;
			justify-content: center;
			width: 100%;
			position: absolute;
			bottom: -10rpx;

			.content {
				width: 690rpx;
				height: 150rpx;
				background: #fff;
				display: flex;
				align-items: center;
				box-shadow: 0 1px 6px rgb(0 0 0 / 10%);
				border-radius: 10rpx;

				.item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					height: 100rpx;

					.icon {
						font-size: 40rpx;
						color: #fec213;
						font-weight: bold;
					}

					.title {
						font-size: 25rpx;
						color: #6c757d;
					}
				}
			}
		}

	}

	.main {
		padding: 0 20rpx;
		margin-top: 20rpx;

		.item {
			height: 120rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #f2f2f2;
			padding: 0 40rpx;

			&:last-of-type {
				border: 0;
			}

			.left {
				display: flex;
				align-items: center;

				.icon {
					color: #539fee;
					font-size: 40rpx;
					margin-right: 20rpx;
				}

				.title {
					font-size: 30rpx;
				}
			}
		}
	}
</style>
