# window	//浏览器对象模型，所有浏览器都支持 window 对象
  * window.open() - 打开新窗口
  * window.close() - 关闭当前窗口
  * window.moveTo() - 移动当前窗口
  * window.resizeTo() - 调整当前窗口的尺寸
  * screen.availWidth - 可用的屏幕宽度
  * screen.availHeight - 可用的屏幕高度
  * location.hostname 返回 web 主机的域名
  * location.pathname 返回当前页面的路径和文件名
  * location.port 返回 web 主机的端口 （80 或 443）
  * location.protocol 返回所使用的 web 协议（http: 或 https:）
  * location.href 返回当前页面的 URL
  * history.back() - 与在浏览器点击后退按钮相同
  * history.forward() - 与在浏览器中点击向前按钮相同
  * navigator 对象包含有关访问者浏览器的信息
# 组件说明
 * public-list 					— 列表公用组件,缺省页,上拉加载动画
 * alphabetically				— 字母索引排序列表
 * automatic-switch 			— 开关选择器
 * date-selection				— 日期选择器-年月日
 * default-page					— 缺省页
 * load-more					— 上拉加载更多
 * mp-html						— 富文本解析
 * navigationBar				— 自定义导航栏-h5,app,微信小程序均做了处理
 * navigationBarChange			— 导航栏渐变色,触底透明,滚动变色
 * read-more					— 内容过多自动隐藏,点击阅读更多,点击收起
 * spring-frame					— 再次确认弹框
 * time-selection				— 时间选择器
 * u-message-input				— 六位验证码输入框
 * uni-drawer					— 抽屉
 * rich-text-editing			— 富文本编辑器
 * left-slip					— 左滑删除列表
# css
 ## 动画
  ### animation: 动画名字 动画时长 动画播放设置 启动前的延迟间隔 播放次数
	* 动画播放设置:	linear		 	 - 动画从头到尾的速度是相同的。
					ease			 - 默认。动画以低速开始，然后加快，在结束前变慢。
					ease-in			 - 动画以低速开始。
					ease-out		 - 动画以低速结束。
					ease-in-out	     - 动画以低速开始和结束。
  ### transform:2D 转换
	* transform: rotate(0deg)-{0%}  ——  transform: rotate(180deg)-{100%}		2D已X轴中心点旋转180°(加上颜色效果更好)
	* transform: translateX(100%)-{0%}  ——  transform: translateX(0%)-{100%}	2D根据X轴平移从右到做(加上淡出效果更好)
	* transform: scale(1.2)-{0%}  ——  scale(1)-{100%}							2D已中心点进行缩放
	* transform:skew(0deg,180deg)-{0%}  ——  skew(0deg,180deg)-{100%}
	  两个参数值，分别表示X轴和Y轴倾斜的角度，如果第二个参数为空，则默认为0，参数为负表示向相反方向倾斜。
	* transform:matrix(0.866,0.5,-0.5,0.866,0,0)
	  六个参数，包含旋转，缩放，移动（平移）和倾斜功能
	*
	 
 ## 光标
	* cursor:Pointer -手掌光标(点击,触摸)
			 Move -拖动光标(拖拽)
			 wait -加载光标(加载)
			 text -指示文本光标(复制文本内容)
			 not-allowed -禁用光标(禁用)
 ## 伪类
	* :first-child 	-伪类来选择父元素的第一个子元素
	* :last-child 	-选择父元素的最后一个子元素
	* :hover 		-鼠标放在链接上的状态
 ## 宽高
	* height 		-设置元素的高度
	* min-height	-设置元素的最小高度
	* max-height	-设置元素的最大高度
	* line-height	-设置行高
	* width			-设置元素的宽度
	* min-width		-设置元素的最小宽度
	* max-width		-设置元素的最大宽度
 ## Grid
	* display:grid;							-网格布局
	* grid-template-columns:repeat(4,25%);	-横向分4等分
	* grid-template-rows:repeat(4,25%);		-纵向分4等分
	* grid-row-gap: 20rpx;					-行间距
	* grid-column-gap: 20rpx;				-列间距
# 常用
 * Icon Park   		— 字节的图标库
 * CodeFun - UI		— UI 设计稿智能生成前端源代码
 * Sass				— Sass 是一款强化 CSS 的辅助工具
 * ECharts			— 开源可视化图表库
 * Element - UI		— PC端UI组件库
# 事件


# es6
 ## 字符串
  * includes()：返回布尔值，判断是否找到参数字符串。
  * startsWith()：返回布尔值，判断参数字符串是否在原字符串的头部。
  * endsWith()：返回布尔值，判断参数字符串是否在原字符串的尾部。
  * repeat()：返回新的字符串，表示将字符串重复指定次数返回。
  * padStart()返回新的字符串，表示用参数字符串从头部（左侧）补全原字符串。
  * padEnd()返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串。
  * ``除了作为普通字符串，还可以用来定义多行字符串，还可以在字符串中加入变量和表达式。
 ##	拷贝
  * 浅拷贝 ===>>> let a = {...b} ; let a = Object.assign({},b)
  * 深拷贝 ===>>> let a = JSON.parse(JSON.stringify(b))
# Sass
 * !default 含义是：如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。
 * @mixin 混合器名 {}   =====>>> @include 混合器名     >>>>混合器
 * 混合器传参 >> @mixin 混合器名 (传参1,传参2) {样式:传参1;样式:传参2;} ===>>>
             @include 混合器名 (传参1:值,传参2:值); 给参数名赋值，防止顺序错乱
 * @extend 选择器; ===>> 继承样式

# ts
 ## 数据类型
  * 布尔值 		let a:boolean = true;
	* 数值   		let a:number = 6;
	* 字符串 		let a:string = "user";
	* 空值   		let a:void = undefined; ===>>> void类型只能赋值undefined
	* null			let a:null = null;
	* undefined let a:undefined = undefined;
	* 任意值		 let a:any = 任意值;	===>>>	任意值为任意类型
	* 联合类型	 let a:number | string |  ===>>> a = 2 ===>> a = "ts"
	* 接口  		interface Num{name:string,age?:number} ==>> let a:Num{name:"ts",age:15}  ‘?’选填
							readonly name:string  => 赋值后不可更改只能已读
	* 数组			let a:number[] = [1,2]	=>	let a:Array<number> = [1,2] =>	let a:any[] = [1,"2"]
# cnpm
  * i 是 install 的简写
  * -g 是全局安装，不带 -g 会安装在个人文件夹
  * -S 与 --save 的简写，安装包会写入生产环境中
  * -D 与 --save-dev 的简写，安装包写入开发环境中
  * cnpm i typescript -S 
  * cnpm i


 