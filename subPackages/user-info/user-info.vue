<template>
	<view class="wrap">
		<!-- header -->
		<!-- 头 -->
		<view class="header">
			<text class="iconfont icon-fanhuijiantou"></text>
			<text class="setting">我的设置</text>
		</view>
		<!-- main -->
		<view class="main">
			<view class="item">
				<text>头像</text>
				<image src="http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/615e8cdb4beffde65090.JPG" mode=""></image>
			</view>
			<view class="item">
				<text>昵称</text>
				<input type="text" value="123">
			</view>
			<view class="item">
				<text>性别</text>
				<text>你猜</text>
			</view>
			<view class="item">
				<text>手机</text>
				<text>170****6012</text>
			</view>
			<view class="btn bg-main text-white flex justify-center align-center rounded mt-2">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
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
		padding: 0 30rpx;
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
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
