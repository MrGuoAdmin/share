<template>
	<view>
		<navigationBar>
			<view slot="center">首页</view>
		</navigationBar>
		<view class="main_bg">

			<view class="list-bg" v-for="(item,index) in 3" :key="index">

			</view>

		</view>

		<read-more showHeight="50" :content="content"></read-more>
	

		<view class="" style="height: 150rpx;"></view>
		<view class="buttom-botton">
			<view class="">sadas3256</view>
		</view>

	</view>
</template>

<script>
	import readMore from "@/components/read-more/read-more.vue"
	import $calendar from "@/config/calendar.js"
	export default {
		components: {
			readMore,
		},
		data() {
			return {
				content: "1",
				list: [],
				content:"拉升阶段啦是角度来看撒娇的离开洒家到看到了啥的卢卡斯觉得卢卡斯就就将计就计斤斤计较急急急酷酷酷酷酷酷了撒赖扩大解释拉开角度来看就卢卡斯记录离开洒家的卢卡斯觉得离开离开家可怜见立刻就撒；了库萨克酷酷酷酷酷酷",
			}
		},
		onLoad() {
			console.log($calendar.solar2lunar(2022, 1, 13))
			console.log(this.$change.dateFormat(1))
			// console.log(this.$root)
		},
		methods: {

		},
	}
</script>

<style lang="scss">
	page {
		font-size: 40rpx;
		background-color: #f7f7f7;
	}

	.margin_top {
		margin-top: 60rpx;
	}

	.list-bg {
		width: 100%;
		height: 80rpx;
		margin-top: 32rpx;
		background-color: #4AE89E;
		animation: 1s fadeio ease;
	}

	.buttom-botton {
		color: $white_color;
		@include bottom-button(128rpx, #333);
		transition: width 2s;
	}

	.buttom-botton:hover {
		width: 100rpx;
	}

	@keyframes fadeio {
		0% {
			transform: rotateX(0deg);
			// transform: translateX(100%);
			// opacity: 0.3;
			// background-color: #007AFF;
			// transform: rotate(0deg);
		}

		// 50%{
		// 	// transform:skew(180deg,180deg);
		// }

		100% {
			transform: rotateX(180deg);
			// transform: translateX(0%);
			// transform: rotate(180deg);
			// opacity: 1;
		}
	}

	// @keyframes fadeAnimation {	/*淡出 -适用:*/
	//     0% {
	//         opacity: 0;
	//     }
	//     100% {
	//         opacity: 1;
	//     }
	// }
	.a {
		@include font_size(30px, red, DIN, 500);
	}

	.b {
		@include font_size(30px, blue, DIN, 560);

		text: {
			align: left;
		}
	}
</style>
