import App from './App'

// 全局导航栏组件
import navigationBar from "@/components/navigationBar/navigationBar.vue"

// 封装导航栏组件
Vue.component("navigationBar",navigationBar);

import $utils from 'utils/utils.js'				//正则判断，时间戳转换
import $https from 'utils/request.js'			//请求方法
import $change from 'utils/change.js'			//日期的转换
import $encryption from 'utils/encryption.js'	//Md5加密
import $public from 'common/public.js'			//公有的参数

Vue.prototype.$utils = $utils			//正则判断，时间戳转换
Vue.prototype.$https = $https			//请求方法
Vue.prototype.$change = $change			//日期的转换
Vue.prototype.$encryption = $encryption	//Md5加密
Vue.prototype.$public = $public			//公有的参数


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif