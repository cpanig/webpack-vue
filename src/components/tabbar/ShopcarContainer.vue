<template>
	<div class="shopcar-container">
		<div class="goods-list">
			<div class="mui-card" v-for="(item , i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
						v-model="$store.getters.getGoodsSelected[item.id]"
						@change="selectedChanged(item.id , $store.getters.getGoodsSelected[item.id])"></mt-switch>
						<img :src="item.thumb_path" alt="">
						<div class="info">
						<h1>{{ item.title}}</h1>
						<p> 
						<span class="price">￥{{item.sell_price}}</span>
						<numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
						<!-- 先创建一个空对象，然后循环购物车中所以的商品数据 -->
						<!-- 循环购物车中的商品，得到一个id值、count值的数组， -->
						<!-- 点击加减时与vuex里的car同步 -->
						<!-- 首先要获取对应货品的id，作为父组件的值传到子组件内 -->
						<a href="#" @click.prevent="reMove(item.id, i)">删除</a>
						<!-- reMove方法 -->
						<!-- 得到要删除的货品的id值，传递给vuex -->
						<!-- vuex遍历car，找到对应id值的数组项，并整个删除 -->
						<!-- 同时，购物车内的goodslist数组也要同步删除 -->
						<!-- 同时更新localStorage -->
						</p>
						</div>
					</div>
				</div>
			</div>
		
		
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
							<p>总计（不含运费）</p>
							<p>已勾选商品<span class="red">{{ $store.getters.getGoodsCountAndAmount.count}}
							</span>件，总价<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
							
						</div>
						<mt-button type="danger" >去结算</mt-button>
					</div>
					
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import numbox from '../subcomponent/shopcar_numbox.vue'
	
	export default{
		data(){
			return{
				goodslist : [] ,//购物车中所有商品的数据

			}
		},
		created(){
			this.getGoodsList();
		},
		methods:{
			getGoodsList(){
				var idArr = [] ;

				// 1. 获取到 store中所有的商品id，然后拼接处一个 用逗号分隔的 字符串
				// 2. 用该id数组进行数据请求，得到对应的商品信息		
				this.$store.state.car.forEach(item => idArr.push(item.id));
				
				// 若没有商品，直接返回，防止出错
				if(idArr.length <= 0) return false  ;
				this.$http.get('api/goods/getshopcarlist/' + idArr.join(","))
				.then(result =>{
					if(result.body.status === 0){
						this.goodslist = result.body.message;
					}
				})
			},
			reMove(id,index){
				
				//首先把购物车页面的项给删掉
				//然后触发一个方法，把vuex里面的数据也删掉
				this.goodslist.splice(index,1);
				
				this.$store.commit("removeFormCar", id)
			},
			selectedChanged(id, val){
				//每当点击开关，把最新的开关状态同步到store中
				this.$store.commit("updateGoodsSelected",{	id , selected : val});
			}
		},
		
		components:{
			numbox
		}
	}
</script>

<style lang="scss">
	.shopcar-container{
		background-color: #eee;
		overflow: hidden;
		.goods-list{
			.mui-card-content-inner{
				display: flex;
				align-items: center;
			}
			img{
				width: 60px;
				height: 60px;
			}
			h1{
				font-size: 13px;
			}
			.info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.price{
					color: red;
					font-weight: bold;
				}
			}
		}
	
	
	
		.jiesuan{
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.red{
				color: red;
				font-weight: bold;
				font-size: 16px;
			}
		}
	}
</style>
