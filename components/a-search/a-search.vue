<template>
	<view class="search-wrap">
		<uni-icons size="22" color="#9b9794" :type="data.type"></uni-icons>
		<text class="title">{{data.placeholder}}</text>
	</view>
</template>

<script setup>
	defineProps({
		data: {
			type: Object,
			default: () => {}
		}
	})
</script>

<style lang="scss" scoped>
	.search-wrap {
		width: 725rpx;
		height: 75rpx;
		background: #f5f5f1;
		border-radius: 10rpx;
		margin: 20rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;

		.title {
			margin-left: 20rpx;
			color: #9b9794;
		}
	}
</style>
