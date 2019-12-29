//入口文件

// 导入vue
import Vue from 'vue'

//导入 路由
import VueRouter from 'vue-router'
import router from './router.js'

// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//设置get请求根路径
//需要在vue-resource引入后再配置
Vue.http.options.root = 'http://www.liulongbin.top:3005'

//设置post表达格式组织形式
Vue.http.options.emulateJSON = true ;

//引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/';
axios.interceptors.response.use(function(ret){
	let data = ret.data;
	return data;
},function(err){
	console.log(err);
});


// mui 组件
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//全部 Mint-UI中的组件
import MintUI from'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入App 根组件(首页)
import app from './components/App.vue'


//使用过滤器,安装 cnpm i moment -S 时间插件
import moment from 'moment'

Vue.filter('dataFormat',function(dataStr , pattern="YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
})


//导入 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站, 先从本地存储中把购物车的数据读出来
var car = JSON.parse(localStorage.getItem('car'))

//创建vuex实例
var store = new Vuex.Store({
	state:{
		car: car //储存购物车中商品的数据 { id:商品id , count:购买数量 selected: 是否勾选商品true/false}
	},
	mutations:{
		//把购物车中的id和和数量添加到car中
		addToCar(state,goodsinfo){
			//点击加入购物车,把商品信息保存到store中的car上
			// 1. 如果购物车中,之前已有对应的商品,则只更新数量
			// 2. 如果没有对应的商品.直接把对象push到car中即可
			
			// 假设在购物车中,没有找到对应的商品
			var flag = false;
			
			state.car.some(item =>{
				if(item.id === goodsinfo.id){
					console.log('A')
					item.count += parseInt(goodsinfo.count);
					return flag = true ;
					
				}
				
			})
			
			// 如果最终循环完毕,得到的flag为false,则直接把商品信息push进car中
			if(flag === false){
				state.car.push(goodsinfo)
				console.log('B')
			}
			
			//当更新 car之后,把car数组存储到本地的localstorage
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		// 修改购物车中商品的数量值
		updateGoodsInfo(state,goodsinfo){
			// 获得来自组件中传来的id和count值
			// 每次点击只能改变一个商品的值,所以使用找到就可以跳出循环
			// 在car里找到对应的id值后,将外来的count值覆盖car内的count值
			state.car.some(item =>{
				if(item.id == goodsinfo.id){
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			//当修改完商品的数量,把最新的数量保存到本地存储中
			localStorage.setItem('car',JSON.stringify(state.car))
			console.log(car)
		},
		//删除购物车中的数据
		removeFormCar(state,id){
			//根据获取的id,删除car中对应的项
			state.car.some((item,i) =>{
				if(item.id == id){
					state.car.splice(i , 1)
					return true;
				}
			})
			
			localStorage.setItem('car',JSON.stringify(state.car))
			console.log(car)
		},
		//把购物车的最新勾选/取消勾选状态同步到car中
		updateGoodsSelected(state , info){
			state.car.some(item=>{
				if(item.id == info.id){
					item.selected = info.selected
				}
			})
		localStorage.setItem('car',JSON.stringify(state.car))
		console.log(car)	
		}
		
		
	},
	getters:{
		getAllCount(state){
			var c = 0 ;
			state.car.forEach(item =>{
				c += item.count;
			})
			
			return c 
		},
		getGoodsCount(state){
			var o = {}
			state.car.forEach(item=> {
				o[item.id] = item.count ;
			})
			return o ;
		},
		getGoodsSelected(state){
			var o = {}
			state.car.forEach(item =>{
				o[item.id] = item.selected
			})
			return o 
		},
		//计算总价
		getGoodsCountAndAmount(state){
			var o = {
				count : 0, //勾选数量
				amount : 0 //总价
			}
			state.car.forEach(item =>{
				if(item.selected){
					o.count += item.count ; 
					o.amount += parseInt(item.price) * parseInt(o.count)  ; 
				}
				
			})
			return o ; 
		}
			
	}
	
	
		
})



// 渲染
var vm = new Vue({
	el:'#app',
	render: c => c(app),
	router,	//挂载路由实例
	store  		//挂在vuex实例,只要挂载到了vm上,就能全局访问所以数据
	
	
})