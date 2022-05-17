// 先引用该方法,获取图片本地路径后调用该方法把图片路径传入该方法后执行回调方法，微信APPh5均做过处理
// import $uploadImg from "@/common/uploadImg.js"	//页面引用该方法
// 使用方法this.$uploadImg(res.tempFiles).then((res) =>{console.log(res)})

var api = "***************************************" //接口api路径

export default function uploadImg(imgList) { //imgList 为本地路径列表
	uni.showLoading({
		title: '上传中'
	});
	return new Promise((resolve, reject) => {
		var list = []
		var url = "***********************" //图片路径自行更换
		uni.request({
			url: api, //请求接口
			success: (res) => {
				imgList.forEach((item, index) => {
					var time = new Date().getTime();
					// #ifdef H5||APP-PLUS
					var name = time + index + (item.name).substr(-4)
					// #endif
					// #ifdef MP-WEIXIN
					var name = time + index + item.path.substr(-4)
					// #endif
					uni.uploadFile({
						url: "https://up-z1.qiniup.com", //七牛路径自行更换
						filePath: item.path,
						name: 'file',
						formData: {
							"key": name, //上传后返回域名"/"后的路径
							"token": res.data.data.token //token自行更换
						},
						success: (res) => {
							var route = JSON.parse(res.data)
							var img = url + route.key
							list = list.concat(img) //数组的拼接
							if (list.length == imgList.length) {
								uni.hideLoading();
								// uni.showToast({
								// 	title: "图片上传成功",
								// 	icon: "none"
								// })
								resolve(list)
							}
						}
					})
				})
			}
		})
	})
}
