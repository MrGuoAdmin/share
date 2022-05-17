// 日期格式转换时间戳
function changeTime(date) {
	var timestr = date.replace(/-/g, '/');
	var time = new Date(timestr).getTime();
	time = time / 1000
	return time
}

// 秒数转换为日期格式
function changeDate(time, type) { //type = 1时天时分秒 type = 2时24:60:60
	var time = parseInt(time)
	var second = 0 //秒
	var branch = 0 //分
	var hour = 0 //时
	var day = 0 //天
	if (time >= 86400) { //大于86400秒时：天时分秒
		second = parseInt(((time % 86400) % 3600) % 60) //秒
		branch = parseInt(((time % 86400) % 3600) / 60) //分
		hour = parseInt((time % 86400) / 3600) //时
		day = parseInt(time / 86400) //天
		if (type == 1) {
			var date = day + "天" + ("0" + hour).slice(-2) + "时" + ("0" + branch).slice(-2) + "分" + ("0" + second).slice(-2) + "秒"
		} else {
			var date = day + ":" + ("0" + hour).slice(-2) + ":" + ("0" + branch).slice(-2) + ":" + ("0" + second).slice(-2)
		}
	} else if (time >= 3600) { //小于86400秒大于3600时：时分秒
		second = parseInt((time % 3600) % 60) //秒
		branch = parseInt((time % 3600) / 60) //分
		hour = parseInt(time / 3600) //时
		if (type == 1) {
			var date = ("0" + hour).slice(-2) + "时" + ("0" + branch).slice(-2) + "分" + ("0" + second).slice(-2) + "秒"
		} else {
			var date = ("0" + hour).slice(-2) + ":" + ("0" + branch).slice(-2) + ":" + ("0" + second).slice(-2)
		}
	} else if (time > 60) { //小于86400秒大于3600时：时分秒
		second = parseInt(time % 60) //秒
		branch = parseInt(time / 60) //分
		if (type == 1) {
			var date = ("0" + branch).slice(-2) + "分" + ("0" + second).slice(-2) + "秒"
		} else {
			var date = ("0" + branch).slice(-2) + ":" + ("0" + second).slice(-2)
		}
	}
	return date
}

// 根据出生日期判断年龄
function getAge(strBirthday) {
	var returnAge,
		strBirthdayArr = strBirthday.split("-"),
		birthYear = strBirthdayArr[0],
		birthMonth = strBirthdayArr[1],
		birthDay = strBirthdayArr[2],
		d = new Date(),
		nowYear = d.getFullYear(),
		nowMonth = d.getMonth() + 1,
		nowDay = d.getDate();
	if (nowYear == birthYear) {
		returnAge = 0; //同年 则为0周岁
	} else {
		var ageDiff = nowYear - birthYear; //年之差
		if (ageDiff > 0) {
			if (nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay; //日之差
				if (dayDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			} else {
				var monthDiff = nowMonth - birthMonth; //月之差
				if (monthDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			}
		} else {
			returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
		}
	}
	return returnAge; //返回周岁年龄
}

/**
 * 保护代理 ：主要实现了访问主体的限制行为,例如号码省略
 * @param {*} value 需要省略的内容
 * @param {*} front 前面保留几位
 * @param {*} after 后面保留几位
 * @param {*} symbol 代替省略内容的符号，默认为 *
 */
function protect(value,front,after,symbol = "*"){
  value = String(value)
  let ellipsis = value.length - front - after;
  return value.substr(0,front) + symbol.repeat(ellipsis) + value.substr(value.length - after)
}

// 获取日期
function dateFormat(type){
	var date = new Date()	//获取当前日期
	if(type == 1){
		var data = date.getFullYear()	//获取当前年份
	}else if(type == 2){
		var data = date.getMonth() + 1	//获取当前月份：0-11所以要+1
	}else if(type == 3){
		var data = date.getDate()	//获取当前日
	}else if(type == 4){
		var data = date.getDay()	//获取当前星期几
	}else if(type == 5){
		var data = date.getHours()	//获取当前小时
	}else if(type == 6){
		var data = date.getMinutes()	//获取当前分钟
	}else if(type == 7){
		var data = date.getSeconds()	//获取当前秒数
	}else if(type == 8){
		var data = date.getTime()	//获取时间戳毫秒13位
	}else if(type == 9){
		var data = parseInt(new Date().getTime() / 1000)	//获取时间戳秒10位
	}
	return data
}

// 根据经纬度计算两地之间的距离
function space(lat1, lng1, lat2, lng2) {
	var radLat1 = lat1 * Math.PI / 180.0;
	var radLat2 = lat2 * Math.PI / 180.0;
	var a = radLat1 - radLat2;
	var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math
		.sin(b / 2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 1000);
	return s // 单位米
}

//转义符转换为字符
function changeHtml(content){
	var arrEntities = {
		'lt': '<',
		'gt': '>',
		'nbsp': ' ',
		'amp': '&',
		'quot': '"'
	};
	return content.replace(/&(lt|gt|nbsp|amp|quot);/ig, 
	function(all, t) {
		return arrEntities[t];
	});
}
/**
 * 百分比换算
 * @param {*} current 当前数值
 * @param {*} total   最大数值
 * @param {*} retain  保留几位小数,默认为0
 * @param {*} symbol  符号,默认为空
 */
function getPercentage(current, total, retain = 0, symbol = '') {
    // 如果是字符串的话解析为浮点数
    current = parseFloat(current)
    total = parseFloat(total)
    if (current > 0 && total > 0) {
        let value = (current / total * 100).toFixed(retain)
        return value + symbol
    } else {
        return 0 + symbol
    }
}
/**
 * 简单的拷贝(深拷贝和浅拷贝) 
 * 缺点:函数,null,NaN,undefined 无法拷贝,如需拷贝请用 ==>> 递归(渗入)
 * 提示:object不是多层时尽量不要用深拷贝,
 * @param {*} param 需要拷贝的参数
 * @param {*} type  1为浅拷贝,2为深拷贝
 */
function getCopy(param, type = 1) {
    let value = {}
    switch (type) {
        case 1:
            value = {...param}
            break
        case 2:
            value = JSON.parse(JSON.stringify(param))
            break
    }
    return value
}
/**
 * 数字过大时省略
 * @param {*} param 省略的参数
 */
function getReplace(param) {
    if (param) {
        let value = param
        param = String(param)
        if(param.length == 3){
            value = param[0] + "百"
        }else if(param.length == 4){
            value = param[0] + "千"
        }else if(param.length >4&&param.length < 9){
            value = param.substring(0,param.length-4) + "万"
        }else if(param.length > 8){
            value = param.substring(0,param.length-8) + "亿"
        }
        return value
    } else {
        return 0
    }
}

module.exports = {
	changeTime, //日期格式转换时间戳
	changeDate, //秒数转换为日期格式
	getAge, //根据出生日期判断年龄
	protect,//姓名手机号身份证遮掩
	dateFormat,	//获取日期
	space,	//根据经纬度计算两地之间的距离
	changeHtml,	//转义符转换为字符
	getPercentage,//百分比换算
	getCopy,	//拷贝
	getReplace,	//数字过大时省略
}
