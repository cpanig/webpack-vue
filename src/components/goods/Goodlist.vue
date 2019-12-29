<template>
	<div class="goods-list">
		
		<!-- 在网页中的两种跳转方式 -->
		<!-- 方式1：使用a标签 -->
		<!-- 方式2：使用window.location.href 编程式导航 -->
		<router-link :to="'/home/goodsinfo/' +item.id" tag="div" class="goods-item" v-for="item in goodslist" :key="item.id">
		<img :src="item.img_url" alt="">
		<h1 class="title">{{ item.title }}</h1>
		
		<div class="info">
			<p class="price">
					<span class="now">￥{{ item.sell_price }}</span>
					<span class="old">￥{{ item.market_price}}</span>
			</p>	
			<p class="sell">
					<span>热卖中</span>
					<span>剩{{ item.stock_quantity }}件</span>
			</p>
		</div>
		</router-link>
		
		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
	
	
</template>

<script>
	import { Toast } from 'mint-ui';
export default{
	data(){
		return{
			pageindex : 1,
			goodslist : [],
		}
	},
	created(){
		this.getGoodsList();
	},
	methods:{
		getGoodsList(){
			//获取商品列表
			this.$http.get('api/getgoods?pageindex=' +this.pageindex)
			.then(result =>{
				if(result.body.status === 0){
				
				// 如果下一页没有商品了，提示并跳出
				if(result.body.message.length === 0) return Toast('没有更多商品了');

				//将新加载的数据拼接到上一页的数据后
					this.moreData = true;
					this.goodslist = this.goodslist.concat(result.body.message);
					
					
				}
			})
		},
		getMore(){
			this.pageindex++;
			this.getGoodsList();
			console.log(this.moreData);
			
		}
	}
	
}	
</script>

<style lang="scss" scoped="scoped">
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		padding: 8px;
		justify-content: space-between;
		
		.goods-item{
			width: 49%;
			border: 1px solid #ccc;
			box-shadow: 0 0 8px #ccc;
			margin:  3px 0;
			padding: 2px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			min-height: 293px;
			img{
				width: 100%;
			}
			.title{
				font-size: 14px;
			}
			.info{
				background-color: #eee;
				p{
					margin: 0;
					padding: 5px;
				}
				.price{
					.now{
						color: red;
						font-weight: bold;
						font-size: 16px;
					}
					.old{
						text-decoration: line-through;
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.sell{
					display: flex;
					justify-content: space-between;
					font-size: 13px;
				}
		}
	}
	}
</style>
