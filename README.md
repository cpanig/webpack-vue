# 基于 vue + webpack + （mint-ui、MUI）实现组件化开发网页demo

## 第一次提交
	
	1.完成了页面路由分布，跳转
	2.使用了mui、mintui来快速创建样式，但是mintui只能全部导入
	3.编写完成了home页面，轮播图（接口没有完成）
	
## 第二次提交	
	
	1.通过请求接口返回的数据渲染轮播图、新闻信息等
	2.“加载更多”按钮逻辑的编写
	3.将评论作为一个子组件来编写，可以放到任意一个组件中
	4.在入口文件中引入resource，再直接引入请求端口的地址，方便修改
	
## 第三次提交

### 绘制图片列表 组件页面结构并美化样式
	1.制作顶部滑动条
	#### MUI中的滑动组件有一个全屏样式mui-fullscreen，必须手动去除
	2.制作底部图片列表
	3.滑动条无法正常触发滑动，通过检查官方文档，发现是一个js组件，需要被初始化
		+1 导入mui.js
		+2 调用官方提供的方式来初始化
	4.初始化后报错，因bundles会在严格模式下执行		
	5.安装插件
	
	cnpm install babel-plugin-transform-remove-strict-mode -D

### 制作图片列表区域
	1.图片列表需要使用懒加载技术，使用mintui自带的组件
	2.渲染图片列表数据
	3.使用lazy-load懒加载图片

### 实现点击图片跳转到 图片详情页面
	1.改造li 成 router-link 时，使用 tag 属性 指定要渲染为 哪种元素
	
### 实现详情页面的布局，同时获取数据渲染页面	

### 实现 图片详情中 缩略图的功能
	1.使用 vue-preview 插件
	2.获取所以图片，v-for渲染到页面上
	3.注意：新版的组件使用方法不同，不需要使用v-for循环:
	
	<vue-preview :slides="list" @close="handleClose" class="gallery"></vue-preview>
	
	参数 slides ： 存放图片的数组
	参数 close ： 关闭缩略图方法，需要在methods处定义一下，不需要写东西
	之后需要在给每个图片数据加上:
	
	result.body.message.forEach(item =>{
	item.w = 600;
	item.h = 400;
	item.msrc = item.src;
	
	宽度和高度并没有效果，但是最下面这个一定要写，不然缩略图无法显示。
	之后给图片写一下样式就可以了。
	
### Router-link 和 vue-router
	r-l可以设置成一个标签，适合做成商品链接
	但是r-l会改变标签的类型，一般需要加一个tag重新渲染成原来的标签
	<router-link to="路由地址"></router-link>
	而v-r是一种js方法，适合用作表单验证登录
	this.$touter.push(路由地址)