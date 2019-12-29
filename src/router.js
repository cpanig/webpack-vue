//导入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 导入对应的路由组件
//屏幕下方四个主按钮
import Home from './components/tabbar/HomeContainer.vue'
import Member from './components/tabbar/MemberContainer.vue'
import Search from './components/tabbar/SearchContainer.vue'
import Shopcar from './components/tabbar/ShopcarContainer.vue'

//新闻资讯
import Newslist from './components/news/newslist.vue'
import Newsinfo from './components/news/newsinfo.vue'

//图片分享
import PhotoList from './components/Photo/PhotoList.vue'
import Phoroinfo from './components/Photo/Photoinfo.vue'

//商品购买
import GoodList from './components/goods/Goodlist.vue'
import Goodinfo from './components/goods/Goodsinfo.vue'
import GoodDesc from './components/goods/goodsDesc.vue'
import GoodsComment from './components/goods/goodsComment.vue'
var router = new VueRouter({
	routes:[
		// 重定向
		// 当要给路由传指定id时,使用:id
		// 组件中调用路由中的id: this.$route.params.id
		{ path:'/' , redirect:'/home'},
		{ path: '/home' , component:Home},
		{ path: '/member' , component:Member},
		{ path: '/search' , component:Search},
		{ path: '/shopcar' , component:Shopcar},
		{ path: '/home/newslist', component:Newslist},
		{ path: '/home/newsinfo/:id' , component:Newsinfo},
		{ path: '/home/photolist' , component:PhotoList},
		{ path: '/home/photoinfo/:id',component: Phoroinfo},
		{ path: '/home/goodslist' , component:GoodList},
		{ path: '/home/goodsinfo/:id' ,component: Goodinfo},
		{ path: '/home/goodsdesc/:id' , component:GoodDesc , name:'goodsdesc'},
		{ path: '/home/goodscomment/:id',component:GoodsComment , name:'goodscomment'}
		
	],
		linkActiveClass:'mui-active',//覆盖默认路由高亮的类
	
})

export default router