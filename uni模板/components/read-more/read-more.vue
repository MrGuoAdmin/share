<template>
	<view>
		<view class="main_bg" :style="{height:pageHeight + 'px'}">
			<view class="text-content">
				{{content}}
			</view>
			<view class="transparent" v-show="show == true&status == 'close'"></view>
		</view>
		<view class="flex_center" v-if="show">
			<view class="operation" v-show="status == 'close'" @tap="goSwitch">展开</view>
			<view class="operation" v-show="status == 'open'" @tap="goSwitch">关闭</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "read-more", //点击阅读更多，点击收起
		props: {
			content: { //文字内容
				default: "",
			},
			showHeight: { //内容超出此高度才会显示展开全文按钮，单位px（默认 100 ）
				default: 200
			},
		},
		data() {
			return {
				show:false,	//开关状态
				domHeight:0,	//DOM高度
				status:"close",	//当前隐藏与显示的状态，close-收起状态，open-展开状态
				pageHeight:this.showHeight,	//状态高度
			};
		},
		mounted() {
			this.init()
		},
		methods: {
			// 展开或关闭
			goSwitch(){
				this.status = this.status === 'close' ? 'open' : 'close'
				this.pageHeight = this.status === 'close' ? this.showHeight : this.domHeight
			},
			// 判断高度，如果真实内容高度大于占位高度，则显示收起与展开的控制按钮
			init() {
				this.getContentHeight().then(height =>{
					this.domHeight = height
					if(this.showHeight < height){
						this.show = true
						this.status = "close"
					}
				})
			},
			// 获取内容的高度
			getContentHeight() {
				return new Promise(resolve => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.text-content').boundingClientRect(data => {
						resolve(data.height)
					}).exec();
				})
			},
		},
	}
</script>

<style scoped>
	.flex_center{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.main_bg{
		padding: 0;
		overflow: hidden;
		position: relative;
		transition: height 0.5s;
	}
	.text-content {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		line-height: 45rpx;
		color: #434343;
		text-indent: 2em;
	}
	.transparent{
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 80rpx;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%,rgba(255, 255, 255, 0.9) 100%);
	}
	.operation{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #999;
		margin-top: 12rpx;
	}
</style>
