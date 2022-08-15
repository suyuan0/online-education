<template>
	<view class="container">
		<!-- 搜索框 -->
		<a-search :data="searchData"></a-search>
		<!-- 轮播 -->
		<swiper class="swiper-wrap" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperData.data" :key="item.course_id">
				<view class="swiper-item">
					<image class="image" :src="item.src"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 分类 -->
		<view class="category-wrap">
			<view v-for="item in classificationData.data" :key="item.course_id" class="category-item">
				<image :src="item.src" mode="widthFix"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- 横向滚动-优惠券 -->
		<scroll-view class="coupon-wrap" scroll-x="true">
			<view class="coupon-item" v-for="item in couponData" :key="item.id">
				<view class="left">
					<text class="price">￥{{item.price}}</text>
					<text class="title">适用{{item.type==="course" ? '课程' : '专栏'}}：{{item.value.title}}</text>
				</view>
				<view class="right">
					领取
				</view>
			</view>
		</scroll-view>
		<view class="division"></view>
		<!-- 横向滚动-拼团 -->
		<view class="dough">
			<view class="title">
				拼团
			</view>
			<scroll-view lower-threshold="150" @scrolltolower="handlerChangeCurrent" class="scroll-wrap"
				scroll-x="true">
				<view class="item" v-for="item in puzzleListData" :key="item.id">
					<image :src="item.cover"></image>
					<view class="content">
						<text class="title">{{item.title}}</text>
						<text class="price">
							￥{{item.t_price}}
							<text>￥{{item.t_price}}</text>
						</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="division"></view>
		<!-- 最新列表 -->
		<view class="latestList">
			<view class="title">
				<text class="lefft">最新列表</text>
				<text class="right">查看更多</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	// 轮播图
	import {
		getIndexDataAPI,
		couponAPI,
		doughAPI
	} from '@/api/index.js'
	// 搜索框数据
	const searchData = ref({})
	// 轮播图数据
	const swiperData = ref([])
	// 分类数据
	const classificationData = ref([])
	const getData = async () => {
		const {
			data
		} = await getIndexDataAPI()
		// console.log(data)
		// 搜索框数据
		searchData.value = data.find(v => v.type === 'search')
		// 轮播图数据
		swiperData.value = data.find(v => v.type === 'swiper')
		// 分类数据
		classificationData.value = data.find(v => v.type === 'icons')
	}
	getData()
	// 优惠券
	const couponData = ref([])
	const getCouponData = async () => {
		const {
			data
		} = await couponAPI()
		couponData.value = data
	}
	getCouponData()
	// 拼团列表
	const puzzleListData = ref([])
	// 页码
	const puzzleCurrent = ref(1)
	const getPuzzle = async () => {
		const {
			data: {
				rows,
				count
			}
		} = await doughAPI(puzzleCurrent.value)
		// console.log(rows)
		puzzleListData.value = [...puzzleListData.value, ...rows]
	}
	getPuzzle()
	const handlerChangeCurrent = async () => {
		puzzleCurrent.value++
		getPuzzle()
	}
</script>

<style lang="scss" scoped>
	.container {
		height: calc(100vh - 100rpx);
		padding-bottom: 50rpx;
	}

	// 分割
	.division {
		height: 10rpx;
		background: #f5f5f3;
		margin: 0 -20rpx;
	}

	// 轮播
	.swiper-wrap {
		height: 300rpx;
		width: 720rpx;

		swiper-item {
			.swiper-item {

				.image {
					border-radius: 10rpx;
					height: 300rpx;
					width: 100%;
				}
			}
		}
	}

	// 分类
	.category-wrap {
		display: flex;
		flex-wrap: wrap;
		height: 300rpx;
		margin-top: 20rpx;

		.category-item {
			width: 25%;
			justify-content: space-around;
			align-content: space-around;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			image {
				width: 60rpx;
			}

			text {
				font-size: 25rpx;
			}
		}
	}

	// 优惠券
	.coupon-wrap {
		width: 100%;
		white-space: nowrap;
		display: flex;
		padding: 30rpx 0 20rpx 0;

		.coupon-item {
			height: 130rpx;
			display: inline-block;
			min-width: 300rpx;
			margin-right: 40rpx;

			.left {
				height: 100%;
				float: left;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: #fff;
				background: #d39e00;
				border-right: 5rpx dashed #fff;

				.price {
					font-weight: bold;
				}

				.title {
					font-size: 20rpx;
					padding: 0 20rpx;
				}
			}

			.right {
				width: 110rpx;
				background: #ffc107;
				color: #fff;
				font-weight: bold;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	// 拼团
	.dough {

		>.title {
			font-weight: bold;
			font-size: 40rpx;
			padding: 20rpx 0 20rpx 0;
		}

		.scroll-wrap {
			height: 340rpx;
			width: 100%;
			white-space: nowrap;

			.item {
				display: inline-block;

				image {
					width: 400rpx;
					height: 200rpx;
				}

				.content {
					display: flex;
					flex-direction: column;
					height: 50rpx;

					.title {
						margin: 10rpx 0;
					}

					.price {
						color: #f00;

						text {
							color: #bdbab6;
							font-size: 10rpx;
						}
					}
				}

			}
		}
	}

	// 最新列表
	.latestList {
		padding: 20rpx 0 100rpx 0;
		.latestList{
			
		}
	}
</style>