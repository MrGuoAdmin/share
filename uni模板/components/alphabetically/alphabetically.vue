<template>
	<view>
		<slot name="content"></slot>
		<!--头部自定义，可做历史记录等-->

		<!-- 排序列表 -->
		<view class="sort-list" v-for="(item,index) in letterList" :key="index">
			<view class="initials" v-show="item.list.length > 0||zmShow == true">{{item.name}}</view>
			<view class="content-list" v-for="(item,i) in item.list" :key="i" @click="goSelect(index,i)">
				{{item}}
				<!--注意事项：当前排序数据没有属性名-->
			</view>
		</view>

		<!-- 索引 -->
		<view class="indexes-bg">
			<view class="index-list" v-for="(item,index) in letterList" :key="index" @click="goChoice(index)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	// import alphabetically from "@/components/alphabetically/alphabetically.vue"	//引用组件
	// <alphabetically :list="list" @select="goSelect"></alphabetically>	//组件标签
	// goSelect(e){console.log(e)},	//点击值
	import $zm from "@/components/alphabetically/letter/zm.json" //字母列表
	import $initials from '@/components/alphabetically/letter/initials.js' //文字转字母
	export default {
		name: "alphabetically", //字母索引排序列表
		props: {
			list: { //列表,想要进行字母排序的内容列表
				type: Array,
				default: ""
			},
			zmShow: { //排序内容的字母列表为空时，字母是否显示
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				letterList: [], //字母列表
			};
		},
		created() { //数据处理
			this.letterList = $zm
			for (var i = 0; i < this.letterList.length; i++) {
				this.letterList[i].list = []
				this.list.forEach((item, index) => {
					var a = $initials.getPinYinFirstCharacter(item, '', true) //把值转换为大写字母
					a = a.substring(0, 1) //截取第一个大写字母
					if (this.letterList[i].name == a) { //把值的大写字母和字母列表做对比，相等后进行拼接
						this.letterList[i].list = this.letterList[i].list.concat(item)
					}
				})
			}
		},
		mounted() { //获取列表中字母的节点位置
			const query = uni.createSelectorQuery().in(this);
			query.selectAll('.initials').boundingClientRect(data => {
				data.forEach((item, i) => {
					this.letterList[i]["top"] = item.top
				})
			}).exec();
		},
		methods: {
			// 选择
			goChoice(index) { //点击滚动到当前字母下的列表
				if (this.letterList[index].list.length > 0) {
					uni.pageScrollTo({
						scrollTop: this.letterList[index].top - 50,
						duration: 300
					});
				} else {
					uni.showToast({
						title: "当前字母下没有列表",
						icon: "none",
					})
				}
			},
			// 选中 
			goSelect(index, i) {
				this.$emit('select', this.letterList[index].list[i])
			},
		},
	}
</script>

<style scoped>
	.sort-list {
		margin-top: 32rpx;
	}

	.initials {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
	}

	.content-list {
		margin-top: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		padding-bottom: 32rpx;
		border-bottom: 3rpx solid #E6E6E6;
	}

	.indexes-bg {
		position: fixed;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.index-list {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		line-height: 42rpx;
		color: #999;
	}

	.index-list:active {
		color: #007AFF;
	}
</style>
