/**
 * 封装网络请求
 */

import indexConfig from '@/config/index.config'
import encryption from "@/utils/encryption.js"
module.exports = (params) => {
	var seqID = encryption.randomNumber()
	var time = encryption.generationTimestamp()
	var sign = encryption.hexMD5(seqID + encryption.hexMD5(time + encryption.Md5()))
	let url = indexConfig.baseUrl+params.url;			// 线上环境中开启
	// let url = "/dpc" + params.url;							// 本地访问时开启
	let method = params.method;
	let header = params.header || {};
	let data = params.data || {};
	if(params.header){
		header = {
			'Seqid': seqID,
			'H5-time': time,
			'Sign': sign,
			'Authorization':params.header.Authorization
		};
	}else{
		header = {
			'Seqid': seqID,
			'H5-time': time,
			'Sign': sign,
		};
	}
	// 请求方式 get post
	if (method == "POST") {
		header['content-type'] = "application/json"
	}
	//	发起网络请求
	uni.request({
		url: url,
		method: method || "GET",
		header: header,
		data: data,
		dataType: "json",
		sslVerify: false, //	是否验证ssl证书
		success: res => {
			if (res.statusCode && res.statusCode != 200) {
				uni.showToast({
				    title: '系统错误',
					icon:"error",
				    duration: 3000
				});
				return;
			}
			typeof params.success == "function" && params.success(res.data);
		},
		fail: err => {
			uni.showToast({
			    title: '系统错误',
				icon:"error",
			    duration: 3000
			});
			typeof params.fail == "function" && params.fail(err.data);
		},
		complete: (e) => {
			// console.log("请求完成");
			typeof params.complete == "function" && params.complete(e.data);
			return;
		}
	})
}
