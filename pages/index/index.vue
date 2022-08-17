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
				{{listType === 'group'? '拼团':'秒杀'}}
			</view>
			<scroll-view lower-threshold="150" @scrolltolower="handlerChangeCurrent" class="scroll-wrap"
				scroll-x="true">
				<view class="item" v-for="item in puzzleListData" :key="item.id">
					<text class="tip">{{courseType[item.type]}}</text>
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
				<text class="left">最新列表</text>
				<text class="right">查看更多</text>
			</view>
			<view class="main">
				<view class="item" v-for="item in latestListData.data" :key="item.id">
					<view class="left">
						<image :src="item.cover" mode=""></image>
						<text class="tip">{{courseType[item.type]}}</text>
					</view>
					<view class="right">
						<text class="title">{{item.title}}</text>
						<text class="price">
							￥{{item.price}}
							<text>￥{{item.t_price}}</text>
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		courseType
	} from '@/enum/course-type.js'
	import {
		ref
	} from 'vue'
	import {
		onPullDownRefresh,
		onLoad
	} from '@dcloudio/uni-app'
	// 轮播图
	import {
		getIndexDataAPI,
		couponAPI,
		doughAPI
	} from '@/api/index.js'
	const listType = ref('')
	// 搜索框数据
	const searchData = ref({})
	// 轮播图数据
	const swiperData = ref([])
	// 分类数据
	const classificationData = ref([])
	// 最新列表
	const latestListData = ref([])
	const getData = async () => {
		const {
			data
		} = await getIndexDataAPI()
		listType.value = data.filter(v => v.type === 'promotion')[0].listType
		// 搜索框数据
		searchData.value = data.find(v => v.type === 'search')
		// 轮播图数据
		swiperData.value = data.find(v => v.type === 'swiper')
		// 分类数据
		classificationData.value = data.find(v => v.type === 'icons')
		// 最新列表
		latestListData.value = data.find(v => v.type === 'list')
		// console.log(latestListData.value)
	}

	// 优惠券
	const couponData = ref([])
	const getCouponData = async () => {
		const {
			data
		} = await couponAPI()
		couponData.value = data
	}

	// 拼团列表
	const puzzleListData = ref([])
	// 页码
	const puzzleCurrent = ref(1)
	const puzzleCount = ref(0)
	const getPuzzle = async () => {
		const {
			data: {
				rows,
				count
			}
		} = await doughAPI(puzzleCurrent.value, listType.value)
		// console.log(rows)
		puzzleCount.value = count
		puzzleListData.value = [...puzzleListData.value, ...rows]
	}

	const handlerChangeCurrent = async () => {
		const nums = puzzleCurrent.value * 10
		if (nums >= puzzleCount.value) return
		puzzleCurrent.value++
		getPuzzle()
	}
	// 下拉刷新
	onPullDownRefresh(async () => {
		getData()
		getCouponData()
		getPuzzle()
		uni.stopPullDownRefresh()
	})
	onLoad(async () => {
		await getData()
		await getCouponData()
		await getPuzzle()
	})
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
				position: relative;

				.tip {
					position: absolute;
					z-index: 100;
					background: rgba(0, 0, 0, 0.2);
					color: #fff;
					font-size: 20rpx;
					top: 130rpx;
					right: 20rpx;
					padding: 5rpx;
				}

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

		.title {
			padding: 10rpx;
			display: flex;
			justify-content: space-between;

			.left {
				font-weight: bold;
				font-size: 35rpx;
			}

			.right {
				font-size: 20rpx;
				color: #bdbab6;
				line-height: 80rpx;
			}
		}

		.main {
			.item {
				display: flex;
				justify-content: space-around;
				margin-bottom: 20rpx;

				.left {
					margin-right: 15rpx;
					position: relative;

					image {
						width: 300rpx;
						height: 170rpx;
					}

					.tip {
						position: absolute;
						bottom: 10rpx;
						right: 10rpx;
						background: rgba(0, 0, 0, 0.2);
						color: #fff;
					}

				}

				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 400rpx;

					.title {
						display: inline-block;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						-o-text-overflow: ellipsis;
					}

					.price {
						color: #f00;
						font-size: 30rpx;

						text {
							color: #bdbab6;
							font-size: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
