<template>
	<view>
		<view class="mask-bg" v-show="show" @click="goClose" @touchmove.stop.prevent>
			<view class="content-bg" @tap.stop="">
				<view class="main_bg">
					<!-- 标题 -->
					<view class="flex_justify">
						<view class="page-title">{{title}}</view>
						<view class="page-determine" @click="goDetermine">确定</view>
					</view>
					<view style="padding: 20rpx 0;">
						<picker-view class="sliding-bg" indicator-class="sliding-box" :value="valueIndex"
							@change="bindChange">
							<picker-view-column>
								<view :class="valueIndex[0] == index?'select-color select-box':'select-box'"
									v-for="(item,index) in list" :key="index">
									{{item.startTime}}
								</view>
							</picker-view-column>
							<picker-view-column>
								<view :class="valueIndex[1] == index?'select-color select-box':'select-box'"
									v-for="(item,index) in list" :key="index">
									{{item.closeTime}}
								</view>
							</picker-view-column>
						</picker-view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// <time-selection ref="eject" @determine="goDetermine"></time-selection>	//标签
	// this.$refs.eject.goClose()		//调用弹出
	// goDetermine(e){console.log(e)},	//回调
	import $time from "@/components/time-selection/json/time.json"	//时间格式json数据
	export default {
		name:"time-selection",	//时间选择器
		props: {
			title: { //左上角标题
				default: "请选择"
			},
		},
		data() {
			return {
				list:"",	//时间列表
				show: false, //弹框状态
				valueIndex: [16,17], //初始值
			};
		},
		created() {
			this.list = $time
		},
		methods:{
			// 关闭
			goClose() {
				this.show = !this.show
			},
			// 滑动值
			bindChange(e) {
				this.valueIndex = e.detail.value
			},
			// 确定
			goDetermine() {
				var date = {
					startTime:this.list[this.valueIndex[0]].startTime,
					closeTime:this.list[this.valueIndex[1]].closeTime
				}
				this.goClose()
				this.$emit('determine', date)
			},
		},
	}
</script>

<style scoped>
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
		z-index: 999;
		text-align: center;
		background: rgba(0, 0, 0, 0.3);
		animation: fadeAnimation 0.5s ease;
		/* 淡出动画 */
	}
	
	.content-bg {
		width: 100%;
		min-height: 200rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0px 0px;
		position: absolute;
		bottom: 0;
		animation: 0.4s eject ease;
		/* 由下到上动画 */
	}
	
	.main_bg {
		padding: 30rpx;
	}
	
	.page-title {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 550;
		color: #333333;
	}
	
	.page-determine {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.sliding-bg {
		height: 500rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
	}
	
	.sliding-box {
		height: 92rpx;
		border-top: #CCCCCC 0.4rpx solid;
		border-bottom: #CCCCCC 0.4rpx solid;
		opacity: 0.4;
	}
	
	.select-box {
		line-height: 92rpx;
	}
	
	.select-color {
		color: #FF6D00;
		font-weight: 520;
	}
	
	@keyframes eject {	/* 呼吸动画-适用:按钮,底部弹框 */
		0% {
			transform: translateY(100%);
		}
	
		100% {
			transform: translateY(0%);
		}
	}
	@keyframes fadeAnimation {	/*淡出 -适用:*/
	    0% {
	        opacity: 0;
	    }
	    100% {
	        opacity: 1;
	    }
	}
</style>
