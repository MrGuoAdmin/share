//效验手机格式
function phoneRegular(mobile) {
	return RegExp(/^1[3456789]\d{9}$/).test(mobile);
}

// 效验身份证号格式
function idRegular(identity) {
	return RegExp(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/).test(identity);
}

//效验邮箱格式
function EmailRegular(email) {
	return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(
		email);
}

// 效验税号格式
function taxRegular(tax) {
	return RegExp(/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/).test(tax);
}

// 效验密码格式(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
function passWordRegular(password) {
	return RegExp(/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/).test(password);
}

//微信号正则
function wxRegular(number) {
	return RegExp(/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/).test(number);
}

//QQ号正则
function qqRegular(qq) {
	return RegExp(/^[1-9]\d{4,9}$/).test(qq);
}

//银行卡号正则
function bankRegular(bank) {
	return RegExp(/^([1-9]{1})(\d{15}|\d{16}|\d{18})$/).test(bank);
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
function formatTime(value, type) { //具体到时分秒
	var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var sdate = ("0" + date.getDate()).slice(-2);
	var hour = ("0" + date.getHours()).slice(-2);
	var minute = ("0" + date.getMinutes()).slice(-2);
	var second = ("0" + date.getSeconds()).slice(-2);
	// 拼接
	if (type == 1) { //年月日时分秒
		var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
	} else if (type == 2) { //年月日时分
		var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute
	} else { //年月日
		var result = year + "-" + month + "-" + sdate
	}
	// 返回
	return result;
}

//判断图片是否存在
function imgRegular(imgurl) {
	return new Promise((resolve, reject) =>{
		var ImgObj = new Image(); //判断图片是否存在
		ImgObj.src = imgurl;
		ImgObj.onload = (res) =>{
			resolve(res);
		}
		ImgObj.onerror = (err) =>{
			reject(err)
		}
	})
}

module.exports = {
	phoneRegular,		//效验手机格式
	idRegular,			//效验身份证号格式
	EmailRegular,		//效验邮箱格式
	taxRegular,			// 效验税号格式
	formatTime,			//时间戳转化为年 月 日 时 分 秒
	passWordRegular,	// 效验密码格式(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
	wxRegular,			//微信号正则
	qqRegular,			//QQ号正则
	imgRegular,			//判断图片是否存在
	bankRegular,		//银行卡号正则
}
