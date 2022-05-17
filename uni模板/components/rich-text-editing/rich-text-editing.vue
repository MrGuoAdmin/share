<template>
	<view>
		<!-- 操作台 -->
		<view class="console">
			<!-- 加粗 -->
			<view :class="styleShow.boldShow == true?'select':''" @tap="goStyle('bold')">B</view>
			<!-- 斜体 -->
			<view style="font-style:oblique;" :class="styleShow.italicShow == true?'select':''"
				@tap="goStyle('italic')">Ⅰ</view>
			<!-- 下划线 -->
			<view class="img-bg">
				<image class="upload-img" v-show="styleShow.decorationShow == false" @tap="goStyle('decoration')" src="https://img.jfgy.top/text-underline.png" mode=""></image>
				<image class="upload-img" v-show="styleShow.decorationShow" @tap="goStyle('decoration')" src="https://img.jfgy.top/text-underline-two.png" mode=""></image>
			</view>
			<!-- 缩进 -->
			<view class="img-bg">
				<image class="upload-img" v-show="styleShow.indentShow == false" @tap="goStyle('indent')" src="https://img.jfgy.top/indent-left.png" mode=""></image>
				<image class="upload-img" v-show="styleShow.indentShow" @tap="goStyle('indent')" src="https://img.jfgy.top/indent-left-two.png" mode=""></image>
			</view>
			<!-- 字体颜色 -->
			<view class="img-bg">
				<image class="upload-img" v-show="styleShow.colorShow == false" @tap="goStyle('color')" src="https://img.jfgy.top/platte.png" mode=""></image>
				<image class="upload-img" v-show="styleShow.colorShow" @tap="goStyle('color')" src="https://img.jfgy.top/platte-two.png" mode=""></image>
			</view>
			<!-- 上一步 -->
			<view class="img-bg">
				<image class="upload-img" @tap="goBack" src="https://img.jfgy.top/back.png" mode=""></image>
			</view>
			<!-- 下一步 -->
			<view class="img-bg">
				<image class="upload-img" @tap="goNext" src="https://img.jfgy.top/next.png" mode=""></image>
			</view>
			<!-- 图片 -->
			<view class="img-bg">
				<image class="upload-img" @tap="goUpload" src="https://img.jfgy.top/image.png" mode=""></image>
			</view>
			<!-- 清除 -->
			<view class="img-bg margin_top">
				<image class="upload-img" @tap="goEliminate" src="https://img.jfgy.top/eliminate.png" mode=""></image>
			</view>
		</view>

		<!-- 编辑器 -->
		<editor id="editor" :style="{height:height + 'rpx'}" class="edit-content margin_top" :placeholder="tips"
			@ready="onEditorReady" @input="goContent">
		</editor>

	</view>
</template>

<script>
	// 引入组件 <rich-text-editing @obtain="goObtain"></rich-text-editing>
	// 内容改变时触发@obtain
	// 上传图片时需先配置$uploadImg
	import $uploadImg from "@/components/rich-text-editing/uploadImg.js"
	export default {
		name: "rich-text-editing", //编辑富文本-h5,wx,app兼容
		props: {
			tips: { //提示内容
				default: "请输入内容"
			},
			height: { //富文本编辑器高度——最小值：400
				default: 400
			},
			fontColor:{ //调试器颜色
				type:String,
				default:"#007AFF"
			},
			content:{	//初始化时编辑器内容，有内容时显示，无内容时为空
				default:"",//<p>你好</p>
			},
		},
		data() {
			return {
				editorCtx: "",
				styleShow: {
					boldShow: false,	//加粗
					italicShow: false,	//斜体
					colorShow:false,	//调速器
					decorationShow:false,//下划线
					indentShow:false,	//缩进
				},
			};
		},
		methods: {
			// 获取编辑器内容
			goContent(e) {
				this.$emit('obtain', e.detail.html)
			},
			// 编辑器初始化完毕
			onEditorReady() {
				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					if(this.content){
						this.editorCtx.setContents({
							html:this.content,
						})
					}
				}).exec()
				// #endif
			},
			// 修改样式 
			goStyle(e) {
				switch (e) {
					case "bold":
						this.styleShow.boldShow = !this.styleShow.boldShow
						this.editorCtx.format("bold", "550")
						break;
					case "italic":
						this.styleShow.italicShow = !this.styleShow.italicShow
						this.editorCtx.format("fontStyle", "oblique")
						break;
					case "color":
						this.styleShow.colorShow = !this.styleShow.colorShow
						if(this.styleShow.colorShow){
							this.editorCtx.format("color", this.fontColor)
						}else{
							this.editorCtx.format("color", "#000")
						}
						break;
					case "decoration":
						this.styleShow.decorationShow = !this.styleShow.decorationShow
						this.editorCtx.format("textDecoration", "underline")
						break;
					case "indent":
						this.styleShow.indentShow = !this.styleShow.indentShow
						this.editorCtx.format("textIndent", "2em")
						break;
				}
			},
			// 上一步 
			goBack() {
				this.editorCtx.undo()
			},
			// 下一步
			goNext() {
				this.editorCtx.redo()
			},
			// 清除
			goEliminate() {
				this.editorCtx.clear({
					success: res => {
						uni.showToast({
							title: "清除成功",
							icon: "none"
						})
					}
				})
			},
			// 上传图片 
			goUpload() {
				uni.chooseImage({
					count: 9,
					success: (res) => {
						$uploadImg(res.tempFiles).then((res) => {
							res.forEach((item, i) => {
								this.editorCtx.insertImage({
									src: item,
									alt: "图片上传失败",
									width: "100%",
									height: "100%",
									success: res => {
										uni.showToast({
											title: "图片上传成功",
											icon: "none"
										})
									}
								})
							})
						})
					}
				})
			},
		}
	}
</script>

<style scoped>
	.margin_top{
		margin-top: 16rpx;
	}
	.console {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(8, 12.5%);
		padding: 10rpx 0;
		text-align: center;
	}

	.select {
		color: #007AFF;
	}

	.img-bg {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.upload-img {
		width: 43rpx;
		height: 43rpx;
	}

	/* 编辑器 */
	.edit-content {
		width: 100%;
		font-size: 32rpx;
		background-color: #f7f7f7;
		color: #000;
	}
</style>
