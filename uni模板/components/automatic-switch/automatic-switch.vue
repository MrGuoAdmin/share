<template>
	<view>
		<view :class="show == false?'switch-bg':'switch-bg activation'" @click="goSwitch">
			<view class="close-bg motion-left" v-if="show == false"></view>
			<view class="close-bg motion-right" v-if="show == true"></view>
		</view>
		
		<!-- 再次确认 -->
		<spring-frame ref="close" @determine="goDetermine"></spring-frame>
			
	</view>
</template>

<script>
	// <automatic-switch @callback="goCallback" :show="show"></automatic-switch>	//标签
	// goCallback(e){this.show = !this.show},	//回调
	import springFrame from "@/components/automatic-switch/spring-frame/spring-frame.vue"
	export default {	//开关选择器
		components: {
			springFrame,
		},
		name:"automatic-switch",
		props:{
			show:{	//当前开关状态
				type:Boolean,
				default:false
			},
			tipsState:{	//是否再次确认
				type:Boolean,
				default:true
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 切换
			goSwitch(){
				if(this.tipsState){
					this.$refs.close.goClose()
				}else{
					this.$emit('callback', this.show)
				}
			},
			// 确定
			goDetermine(e) {
				this.$emit('callback', this.show)
			},
		},
	}
</script>

<style scoped>
	.switch-bg{
		width: 100rpx;
		height: 54rpx;
		background: #FFFFFF;
		border: 2rpx solid #E6E6E6;
		border-radius: 26rpx;
		padding: 0 3rpx;
		display: flex;
		align-items: center;
	}
	.activation{
		background: #4AE89E;
		display: flex;
		flex-direction: row-reverse;
	}
	.close-bg{
		width: 46rpx;
		height: 46rpx;
		background: #FFFFFF;
		border: 2rpx solid #FFFFFF;
		box-shadow: 0rpx 4rpx 6rpx rgba(0, 0, 0, 0.16);
		border-radius: 26rpx;
	}
</style>
