<template>
	<div class="goodsinfo-container">
		<transition
		@before-enter="beforeEnter"
		@enter="enter"
		@after-enter="afterEnter">
		<div class='ball' v-show="ballflag" ref="ball"></div>
		</transition>
		<!-- 商品轮播图区域 -->
			<div class="mui-card">
				<div class="mui-card-content">
					<swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
				</div>
			</div>
		<!-- 商品购买区域 -->
			<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价: <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
							<span class="now_price">￥{{goodsinfo.sell_price}}</span>
						</p>
						<p>购买数量：<numbox @getcount="getSelectedCount"
						:max="goodsinfo.stock_quantity"></numbox></p>
						<p>
							<mt-button type="primary" size="small">立即购买</mt-button>
							<mt-button type="danger" size="small"  @click="addToShopcar">加入购物车</mt-button>
						</p>
					</div>
				</div>
			</div>
		
		<!-- 商品参数区域 -->
			<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
						<p>库存情况：{{goodsinfo.stock_quantity}}件</p>	
						<p>上架时间：{{goodsinfo.add_time | dataFormat}} </p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button to="/home/goodsdesc" type="primary" size="large"  plain @click="goDesc">图文介绍</mt-button>
					<mt-button to="/home/goodscomment"type="danger" size="large" plain @click="goComment" id="shopCar">商品评论</mt-button>
					//需要把购物车里的数量值与选择框里的数量值关联起来
					//涉及到子组件向父组件传值
					//子组件可以向父组件传递一个方法，子组件调用方法，同时把参数传递给父组件
				</div>
			</div>
	</div>
</template>

<script>
	import swiper from "../subcomponent/swiper.vue"
	import numbox from "../subcomponent/goodsinfo_numbox.vue"
	
	import $ from 'jquery'
	
	export default{
		data(){
			return{
				id : this.$route.params.id, //当前路由链接中挂在的id
				lunbotuList : [],
				goodsinfo : [],	
				ballflag : false, // 控制小球隐藏显示的标识符
				selectedCount : 1  //保存用户选择的商品数量，默认用户买1件
			}
		},
		mounted(){
			this.$axios.get('api/getthumimages/'+ this.id).then(data =>{
				data.message.forEach(item =>{
					item.img = item.src
				})
				this.lunbotuList = data.message;
			});
			this.$axios.get('api/goods/getinfo/'+this.id).then(data =>{
				this.goodsinfo = data.message[0];
			})
		},
		methods:{
			goDesc(id){
				this.$router.push({ name: "goodsdesc",parmas:{id}})
			},
			goComment(id){
				this.$router.push({ name: "goodscomment",parmas:{id}})
			},
			//添加到购物车
			addToShopcar(){
				this.ballflag = !this.ballflag;
				//拼接出一个商品信息对象
				var goodsinfo = {
					id:	 this.id , 
					count: this.selectedCount , 
					price: this.goodsinfo.sell_price , 
					selected : true
				};
				//调用 store 中的 mutations 来讲商品加入到购物车中
				this.$store.commit("addToCar",goodsinfo);
			},
			//小球动画
			beforeEnter(el){
				el.style.transform="translate(0,0)"
			},
			enter(el,done){
				//获取页面中小球的位置
				const ballPosition = this.$refs.ball.getBoundingClientRect();
				//获取页面中购物车小球的位置
				const badgePosition = document.getElementById('badge').getBoundingClientRect();
				
				const xDist = (badgePosition.left - ballPosition.left) + 'px';
				const yDist = (badgePosition.top  - ballPosition.top)  + 'px'; 
				
				el.style.transform= `translate(${xDist},${yDist})`;
				el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
				done();
			},
			afterEnter(el){
				this.ballflag= !this.ballflag;
			},
			getSelectedCount(count){
				this.selectedCount = count ;
			}
				
		},
		components:{
			swiper,
			numbox
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.goodsinfo-container{
		background-color: #eee;
		overflow: hidden;
		
		.now_price{
			color: red;
			font-size: 16px;
			font-weight: bold;
		}
		.mui-card-footer{
			display: block;
		button{
			margin: 15px 0;
		}	
		}
	}
	
	.ball{
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: red;
		position: absolute;
		z-index: 100;
		top: 390px;
		left: 146px;
	}
</style>
