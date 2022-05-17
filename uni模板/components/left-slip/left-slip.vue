<template>
	<view>
		<!-- 缺省页 -->
		<default-page :list="list"></default-page>
		
		<!-- 左滑列表 -->
		<view class="flex_align left-slip-list" :style="{'right':item.right+'px'}" v-for="(item,index) in list"
			:key="index" :data-index="index" @touchstart="gotouchstart" @touchmove="gotouchmove">
			<view class="content-bg" :style="{'width':widthNumber+'px'}">
				<slot name="content">
					<!-- 自定义页面 -->
					{{item.right}}
				</slot>
			</view>
			<view class="delete" :style="{'right': -rightNumber+'px'}" @tap.stop="goDelete(index)">删除</view>
		</view>
		
		<!-- 上拉加载动画 -->
		<load-more :status="status"></load-more>
		
		<!-- 再次确认 -->
		<spring-frame ref="eject" @determine="goDetermine"></spring-frame>
		
	</view>
</template>

<script>
	// <left-slip :list="list" ref="monitor" @delete="goDelete"></left-slip>
	// 拿到列表后for (var i in this.list) {this.$set(this.list[i], 'right', 0);}
	// 把列表循环一个"right"数据,用于左滑
	// @delete该事件为点击删除后的回调
	// 监听页面触底动作后	this.$refs.monitor.status = "loading" 变成加载中动画
	// 然后做延迟请求接口,该组件做的有监听list变化后自动更改为上拉加载状态
	import defaultPage from "@/components/left-slip/default-page/default-page.vue"	//缺省页
	import loadMore from "@/components/left-slip/load-more/load-more.vue"	//上拉加载更多
	import springFrame from "@/components/left-slip/spring-frame/spring-frame.vue"	//再次确认
	export default {
		name: "left-slip", //左滑删除
		components:{
			defaultPage,
			loadMore,
			springFrame,
		},
		props: {
			list: { //列表数据
				type: Array,
				default: ""
			},
			margin:{ //页面边距
				default:0
			}
		},
		data() {
			return {
				slide: 55, //最大移动值
				startX: "", //点击的位置
				index: 0, //点击的值
				status: "more", //上拉加载更多// 上拉的状态：more前；loading中；noMore没有更多了
				widthNumber:"",	//内容宽度
				rightNumber:"",	//向右平移的值
			};
		},
		watch: {
			list: {	//监听list列表变化
				handler(res) {
					if(res.length < 10){
						this.status = "noMore"
					}else{
						this.status = "more"
					}
				},
				deep: true,
				immediate: true
			}
		},
		mounted() {
			uni.getSystemInfo({	//获取页面宽度
				success: (res) => {
					this.widthNumber = res.screenWidth - this.margin
					this.rightNumber = res.screenWidth * 0.2
					this.slide = res.screenWidth * 0.15
				}
			})
			if (this.list.length < 10) {
				this.status = "noMore"
			}
		},
		methods: {
			// 触摸开始
			gotouchstart(e) {
				this.startX = e.touches[0].clientX; //获取当前触摸的位置
			},
			// 移动
			gotouchmove(e) {
				var arr = e.touches[0].clientX //获取移动的位置
				var disx = this.startX - arr //触摸开始时的位置减去移动的位置
				if (disx > 5) { //判断移动的位置是否大于20,
					if (disx > this.slide) { //移动的位置大于20时，进行下一步判断，移动的位置是否大于最大移动值
						this.list[e.currentTarget.dataset.index].right = this.slide //移动的位置大于最大移动值是等于最大移动的值
					} else {
						this.list[e.currentTarget.dataset.index].right = disx //移动的位置大于20但小于最大移动值，让他继续移动直到等于最大移动值
					}
				} else { //移动的位置小于20，不触发
					this.list[e.currentTarget.dataset.index].right = 0
				}
			},
			// 删除 
			goDelete(index) {
				this.index = index
				this.$refs.eject.goClose()
			},
			// 再次确认
			goDetermine(){
				this.$emit('delete', this.index)
			},
		},
	}
</script>

<style scoped>
	.flex_align {
		display: flex;
		align-items: center;
	}

	.left-slip-list {
		position: relative;
		margin-top: 16rpx;
	}
	.content-bg{
		background-color: #007AFF;
	}
	.delete {
		width: 108rpx;
		height: 100%;
		background: #FF5050;
		border-radius: 20rpx 0px 0px 20rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
