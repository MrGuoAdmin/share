<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="ceiling" :class="shadow == true?'shadow-bg':''"
			:style="{'height':navigation+'px','background':navigationBarColor,'opacity':change}">
			<view class="flex-align left-side" :style="{'height':height+'px','padding-top':statusBarHeight+'px'}">
				<view class="navigation-center-wx flex-align">
					<slot name="center"></slot>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5||APP-PLUS -->
		<view class="flex-justify ceiling" :class="shadow == true?'shadow-bg':''"
			:style="{'height':navigation+'px','background':navigationBarColor,'opacity':change}">
			<view class="navigation-left flex-align">
				<slot name="left"></slot>
			</view>
			<view class="navigation-center text-align">
				<slot name="center"></slot>
			</view>
			<view class="navigation-right">
				<slot name="right"></slot>
			</view>
		</view>
		<!-- #endif -->

		<!-- 占位 -->
		<view :style="{'height':navigation+'px'}"></view>
	</view>
</template>

<script>
	export default { //导航栏渐变色
		name: "navigationBarChange",
		props: {
			navigationBarColor: { //导航栏颜色
				default: "#E04141"
			},
			shadow: { //阴影
				type: Boolean,
				default: true
			},
			scrollTop: { //滚动的值
				default: 0
			},
		},
		data() {
			return {
				statusBarHeight: "", //状态栏
				navigation: "", //导航栏
				height: "", //标题栏
				change: 1, //变化
			};
		},
		methods: {
			pageScroll() {
				if (this.scrollTop > 0) {
					if (this.scrollTop > 270) {
						this.change = 1;
					} else {
						this.change = this.scrollTop / 270;
					}
				} else {
					this.change = 0;
				}
			},
		},
		// 监听数据变化
		watch: { //数据发送变化是执行
			scrollTop: {
				handler(e) {
					this.pageScroll()
				},
				immediate: true,
				deep: true
			},
		},
		computed: {
			
		},
		directives: {

		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					// #ifdef MP-WEIXIN
					this.statusBarHeight = wx.getMenuButtonBoundingClientRect().top
					this.navigation = res.statusBarHeight + wx.getMenuButtonBoundingClientRect().height +
						(wx.getMenuButtonBoundingClientRect().top - res.statusBarHeight) * 2
					this.height = wx.getMenuButtonBoundingClientRect().height
					// #endif
					// #ifdef APP||H5
					this.statusBarHeight = res.statusBarHeight
					if (res.platform == "android") {
						this.navigation = res.statusBarHeight + 50
					} else {
						this.navigation = res.statusBarHeight + 45
					}
					// #endif
				}
			})
		},
	}
</script>

<style scoped>
	.flex-justify {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.flex-align {
		display: flex;
		align-items: center;
	}

	.text-align {
		text-align: center;
	}

	.ceiling {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 99;
	}

	.shadow-bg {
		box-shadow: 0px 2rpx 0px rgba(0, 0, 0, 0.06);
	}

	/* h5||app */
	.navigation-left {
		width: 150rpx;
		padding-left: 30rpx;
	}

	.navigation-left-image {
		width: 64rpx;
		height: 64rpx;
	}

	.navigation-center {
		width: 350rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 550;
		color: #FFFFFF;
		margin-top: -4rpx;
	}

	.navigation-right {
		width: 150rpx;
	}

	/*  */
	.left-side {
		margin-left: 30rpx;
	}

	.navigation-center-wx {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 600;
		color: #FFFFFF;
		margin-top: -3rpx;
	}
</style>
