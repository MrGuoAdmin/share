<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
			<view class="ceiling" :class="shadow == true?'shadow-bg':''" :style="{'height':navigation+'px','background':navigationBarColor}">
				<view class="flex-align left-side" :style="{'height':height+'px','padding-top':statusBarHeight+'px'}">
					<image v-if="judgeBack" class="navigation-left-image" :src="navigationImg" mode=""  @click="goReturn"></image>
					<view class="navigation-center-wx flex-align">
						<slot name="center"></slot>
					</view>
				</view>
			</view>
		<!-- #endif -->
		<!-- #ifdef H5||APP-PLUS -->
			<view class="flex-justify ceiling" :class="shadow == true?'shadow-bg':''" :style="{'height':navigation+'px','background':navigationBarColor}">
				<view class="navigation-left flex-align">
					<image v-if="judgeBack" class="navigation-left-image" :src="navigationImg" mode=""  @click="goReturn"></image>
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
		<view :style="{'height':navigation+'px'}"></view>
	</view>
</template>

<script>
	// <navigationBar><view slot="center">首页</view></navigationBar>在main.js声明后直接引用
	export default {	//导航栏
		name: "navigationBar",
		props: {
			navigationBarColor: {	//导航栏颜色
				default: "#fff"
			},
			navigationImg:{	//箭头图标
				default:"https://img.jindianxiang.com/1640943117177.png"
			},
			judgeBack:{		//返回箭头
				type:Boolean,
				default:true
			},
			shadow:{	//阴影
				type:Boolean,
				default:true
			},
		},
		data() {
			return {
				statusBarHeight: "", //状态栏
				navigation: "", //导航栏
				height:"",		//标题栏
			};
		},
		methods:{
			// 返回按钮
			goReturn(){
				uni.navigateBack({
					delta:1,
				})
			},
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
					if(res.platform == "android"){
						this.navigation = res.statusBarHeight + 50
					}else{
						this.navigation = res.statusBarHeight + 45
					}
					// #endif
				}
			})
		},
	}
</script>

<style scoped>
	.flex-justify{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.flex-align{
		display: flex;
		align-items: center;
	}
	.text-align{
		text-align: center;
	}
	.ceiling{
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 99;
	}
	.shadow-bg{
		box-shadow: 0px 2rpx 0px rgba(0, 0, 0, 0.06);
	}
	/* h5||app */
	.navigation-left{
		width: 150rpx;
		padding-left: 30rpx;
	}
	.navigation-left-image{
		width: 64rpx;
		height: 64rpx;
	}
	.navigation-center{
		width: 350rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 550;
		color: #333333;
		margin-top: -4rpx;
	}
	.navigation-right{
		width: 150rpx;
	}
	/*  */
	.left-side{
		margin-left: 30rpx;
	}
	.navigation-center-wx{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 600;
		color: #333333;
		margin-top: -3rpx;
	}
</style>
