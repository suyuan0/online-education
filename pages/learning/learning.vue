<template>
	<view class="wrap">
		<!-- header -->
		<view class="header text-center font-weight-bold font-md">
			学习进度
		</view>
		<!-- 未登录 -->
		<view class="not-logged-in flex flex-column align-center justify-center" v-if="!token">
			<image src="../../static/noLogin.png"></image>
			<text>登陆后才可以查看我的学习噢</text>
			<button size="mini" @click="navigateTo('/subPackages/login/login')" plain>立即登录</button>
		</view>
		<!-- 已登录 -->
		<view class="logged-in" v-else>
			<view class="card">
				<view class="item">
					<text class="iconfont icon-dingdan icon"></text>
					<text class="title">帖子</text>
				</view>
				<view class="item">
					<text class="iconfont icon-pinglun icon"></text>
					<text class="title">考试</text>
				</view>
				<view class="item">
					<text class="iconfont icon-shoucang icon"></text>
					<text class="title">电子书</text>
				</view>
			</view>
			<!-- tabs -->
			<view class="tabs-container">
				<view class="header">
					<view v-for="(item,index) in tabsList" :key="item.id" class="tabs-item"
						:class="{active : active===item.tag}" @click="changeActive(item,index)">
						<text>{{item.title}}</text>
						<view v-if="active === item.tag"
							class="horizontal-line animate__animated animate__fadeIn animate__faster"></view>
					</view>
				</view>
				<swiper :current="current" class="main" duration="300">
					<swiper-item v-for="item in tabsList" :key="item.id">
						<text class="title" v-if="studyList.length <=0">没有更多数据了</text>
						<text v-else>{{studyList}}</text>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		navigateTo
	} from '@/utils/navigate.js'
	import {
		getItem
	} from '@/utils/storage.js'
	import {
		TOKEN
	} from '@/utils/constant.js'
	import {
		ref,
		reactive
	} from 'vue'
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		rateOfLearningAPI
	} from '@/api/learn.js'
	const token = ref('')
	// tabs数据
	const tabsList = reactive([{
			title: '课程',
			id: 1,
			tag: 'course'
		},
		{
			title: "专栏",
			id: 2,
			tag: 'column'
		}
	])
	const active = ref('course')
	const current = ref(0)
	const studyModel = reactive({
		page: 1,
		type: 'course'
	})
	// 切换
	const changeActive = (item, index) => {
		active.value = item.tag
		studyModel.type = item.tag
		current.value = index
		getStudyList()
	}
	// 获取学习进度;
	const studyList = ref([])
	const count = ref(0)
	const getStudyList = async () => {
		try {
			const res = await rateOfLearningAPI(studyModel)
			count.value = res.data.count
			studyList.value = res.data.rows
		} catch (e) {
			//TODO handle the exception
		}
	}
	onLoad(() => {
		token.value = getItem(TOKEN)
		getStudyList()
	})
	onShow(() => {
		token.value = getItem(TOKEN)
		getStudyList()
	})
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

			text {
				color: #6c757d;
				margin: 20rpx 0;
			}
		}

		.logged-in {
			padding-top: 50rpx;

			.card {
				box-shadow: 0 1px 6px rgb(0 0 0 / 10%);
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 148rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					height: 100rpx;

					.icon {
						color: #fec142;
						font-size: 40rpx;
					}

					.title {
						color: #6c757d;
						font-size: 25rpx;
					}
				}
			}

			.tabs-container {
				padding-top: 70rpx;

				.header {
					display: flex;
					justify-content: space-around;
					border-bottom: 2rpx solid #f4f4f4;
					padding-bottom: 20rpx;

					.tabs-item {
						font-size: 40rpx;
						color: #8888a7;
						position: relative;
						height: 100%;
						transition: all 0.4s;

						&.active {
							color: #01cf8a;
							font-weight: bold;
						}

						.horizontal-line {
							position: absolute;
							width: 60rpx;
							height: 10rpx;
							background: #01cf8a;
							bottom: -20rpx;
							border-radius: 5rpx;
							left: 50%;
							transform: translateX(-50%);
						}
					}
				}

				.main {
					.title {
						display: block;
						text-align: center;
						margin: 20rpx 0;
						color: #7d7d7d;
					}
				}
			}
		}
	}
</style>
