<template>
	<view>
		<view class="text_align" v-if="list.length == 0">
			<!-- 占位 -->
			<view style="height: 98rpx;"></view>
			
			<image class="default-img" :src="img" mode=""></image>
			<!-- 占位 -->
			<view style="height: 20rpx;"></view>
			
			<view class="default-tips">{{tips}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"default-page",	//缺省页
		props:{
			list:{
				type:Array,
				default:""
			},
			img:{
				type:String,
				default:"https://img.jindianxiang.com/1641361827733.png"
			},
			tips:{
				type:String,
				default:"空空如也，快去添加吧~"
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	.text_align{
		text-align: center;
	}
	.default-tips{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.default-img{
		width: 170rpx;
		height: 170rpx;
	}
</style>
