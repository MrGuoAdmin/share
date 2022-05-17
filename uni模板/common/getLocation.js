// 根据经纬度获取省，市，区，街道等详细地址，高德的key值自行更换
// 此方法运用ajax方法请求，适用所有端
// 调用此方法需先在页面中引用 import $getLocation from "@/common/getLocation.js"
// $getLocation(113.73115,34.6906).then((res) =>{console.log(res)})		//调用
var key = "************" //高度key值

export default function getLocation(lng, lat) { //lng经度，lat维度
	return new Promise((resolve, reject) => {
		var ajax = new XMLHttpRequest();
		ajax.open('get', "https://restapi.amap.com/v3/geocode/regeo?output=json&location=" + lng + "," +
			lat + "&key=" + key + "&radius=1000");
		ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		ajax.send();	//发送
		ajax.onreadystatechange = () => {
			if (ajax.readyState == 4 && ajax.status == 200) { //请求成功
				resolve(JSON.parse(ajax.responseText))	//回调给的是json字符串，用JSON.parse(）转换Object类型
			}
		}
	})
}
