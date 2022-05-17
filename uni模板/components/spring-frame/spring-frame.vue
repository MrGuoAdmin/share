<template>
	<view>
		<view class="mask-bg" v-show="show" @click="goClose" @touchmove.stop.prevent>
			<view class="content-bg" @tap.stop="">
				<view class="spring-title" v-show="title">{{title}}</view>
				<slot name="content"><view class="spring-content margin_top" v-show="content">{{content}}</view></slot>
				<view class="margin_top flex_justify operation-button">
					<view class="lfte-button" :style="{'color':lfteColor,'background':lfteBg}" @click="goClose">
						{{lftebutton}}
					</view>
					<view class="lfte-button" :style="{'color':rightColor,'background':rightBg}" @click="goDetermine">
						{{rightbutton}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引用: <spring-frame ref="close" @determine="goDetermine"></spring-frame>
	// 点击弹出弹框时调头:this.$refs.close.goClose()	弹出弹框
	// goDetermine(e)事件监听点击确定按钮	
	export default {	//再次确认弹框
		name: "spring-frame",
		props: {
			title: { //弹框标题
				default: "提示"
			},
			content: { //弹框提示内容
				default: "确定要进行该操作吗？"
			},
			lftebutton: { //左侧文本
				default: "再想想"
			},
			rightbutton: { //右侧文本
				default: "狠心确定"
			},
			lfteColor: { //左侧按钮文字颜色
				default: "#333"
			},
			lfteBg: { //左侧按钮背景颜色
				default: "#fff"
			},
			rightColor: { //右侧按钮文字颜色
				default: "#fff"
			},
			rightBg: { //右侧按钮背景颜色
				default: "#333"
			},
		},
		data() {
			return {
				show: false,	//弹框状态
			};
		},
		methods: {
			// 关闭
			goClose() {
				this.show = !this.show
			},
			// 确定
			goDetermine() {
				this.show = !this.show
				this.$emit('determine', true)
			},
		},
	}
</script>

<style scoped>
	.margin_top{
		margin-top: 32rpx;
	}
	.flex_justify{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.mask-bg {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9999;
		text-align: center;
		background: rgba(0, 0, 0, 0.3);
		/* -ms-transform: scale(1.185); */
		/* transform: scale(1.185); */
		animation: fadeAnimation 0.2s ease;
		/* 淡出动画 */
	}

	.content-bg {
		position: relative;
		top: 40%;
		width: 516rpx;
		min-height: 200rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
		display: inline-block;
		vertical-align: middle;
		padding: 20rpx;
		animation: sizeAnimation 0.1s ease;
		/* 由大到小动画 */
	}

	.spring-title {
		margin-top: 18rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 550;
		color: #333333;
	}

	.spring-content {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
	}

	.operation-button {
		margin-top: 68rpx;
	}

	.lfte-button {
		width: 245rpx;
		height: 78rpx;
		border: 2rpx solid #E6E6E6;
		border-radius: 16rpx;
		text-align: center;
		line-height: 78rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
	}
	@keyframes fadeAnimation {	/*淡出 -适用:*/
	    0% {
	        opacity: 0;
	    }
	    100% {
	        opacity: 1;
	    }
	}
	@keyframes sizeAnimation {/* 缩放由大到小动画-适用:弹框 */
		0% {
			transform: scale(1.3);	
		}
		100% {
			transform: scale(1);
		}
	}
</style>
