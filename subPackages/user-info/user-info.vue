<template>
	<view class="wrap">
		<!-- header -->
		<!-- 头 -->
		<view class="header">
			<text class="iconfont icon-fanhuijiantou" @click="navigateBack()" ></text>
			<text class="setting">编辑资料</text>
		</view>
		<!-- main -->
		<view class="main">
			<view class="item" @click="uploadAvatar" >
				<text>头像</text>
				<view class="image">
					<image v-if="userInfo.user" :src="userInfo.avatar"></image>
					<view class="empty" v-else></view>
				</view>
			</view>
			<view class="item">
				<text>昵称</text>
				<input type="text" v-model="userInfo.nickname" placeholder="未填写">
			</view>
			<view class="item">
				<text>性别</text>
				<text>{{userInfo.sex}}</text>
			</view>
			<view class="item">
				<text>手机</text>
				<text>{{userInfo.phone}}</text>
			</view>
			<view class="btn bg-main text-white flex justify-center align-center rounded mt-2">
				提交
			</view>
		</view>
	</view>
</template>

<script setup>
	import {navigateBack} from '@/utils/navigate.js'
	import {getItem} from '@/utils/storage.js'
	import {USERINFO} from '@/utils/constant.js'
	import {reactive,ref} from 'vue'
	import {uploadFile} from '@/utils/upload.js'
	let userInfo = reactive({})
	const getUserInfo = ()=>{
		userInfo = getItem(USERINFO)
		console.log(userInfo);
	}
	getUserInfo()
	const uploadAvatar = ()=>{
		uploadFile()
	}
</script>

<style lang="scss" scoped>
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
	.main{
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
		padding: 0 30rpx;
			&:nth-of-type(1):active{
				background: #f1f1f1;
			}
			.image{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
				.empty{
					width: 100%;
					height: 100%;
					background: #f8f9fa;
				}
			}
			input{
				text-align: right;
			}
		}
		.btn{
			height: 100rpx;
		}
	}
</style>
