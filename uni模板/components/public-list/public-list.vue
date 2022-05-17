<template>
	<view>
		<!-- 缺省页 -->
		<default-page :list="list"></default-page>
		<template v-if="list.length > 0">
		
			<!-- 列表自定义 -->
			<template>
				<slot name="list"></slot>
			</template>
			
			<!-- 上拉加载动画 -->
			<load-more :status="status"></load-more>
		</template>
	</view>
</template>

<script>
	// <public-list ref="monitor" :list="list"></public-list>	//引用
	// 监听页面触底动作后	this.$refs.monitor.status = "loading" 变成加载中动画
	// 然后做延迟请求接口,该组件做的有监听list变化后自动更改为上拉加载状态
	import defaultPage from "@/components/public-list/default-page/default-page.vue"	//缺省页
	import loadMore from "@/components/public-list/load-more/load-more.vue"		//上拉加载动画
	export default {	//list列表公用组件，缺省页，上拉加载动画
		name: "public-list",
		components: {
			defaultPage,
			loadMore,
		},
		props: {
			list: {	//列表
				type: Array,
				default: "",
			}
		},
		data() {
			return {
				status: "more", //上拉加载更多
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
			if (this.list.length < 10) {
				this.status = "noMore"
			}
		},
	}
</script>

<style>

</style>
