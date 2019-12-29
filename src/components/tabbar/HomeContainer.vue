<template>
	<div>
		<h3>HOME</h3>
		<!-- 轮播图 -->
		<swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
		
		
		<!-- 六宫格  -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/newslist">
			        <img src="images/1.png" alt="">
			        <div class="mui-media-body">新闻资讯</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/photolist">
			        <img src="images/2.png" alt="">
			        <div class="mui-media-body">图片分享</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/goodslist">
			        <img src="images/3.png" alt="">
			        <div class="mui-media-body">商品购买</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="">
			        <img src="images/4.png" alt="">
			        <div class="mui-media-body">留言反馈</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="">
			        <img src="images/5.png" alt="">
			        <div class="mui-media-body">视频专区</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="">
			        <img src="images/6.png" alt="">
			        <div class="mui-media-body">联系我们</div></router-link></li>	            
		</ul> 
	</div>
</template>

<script>
	import { Toast } from "mint-ui";
	import swiper from "../subcomponent/swiper.vue"
	export default{
		data(){
			return{
				lunbotuList : [] //保存轮播图的数组
			};
		},
		mounted(){
			this.$axios.get("api/getlunbo").then(data =>{
				this.lunbotuList = data.message;
			})
		},
		methods:{
		
		},
		components:{
			swiper
			
		}
	}
</script>


<style lang="scss" scoped>
	
	
	.mui-grid-view.mui-grid-9{
		background-color: #fff;
		border: none;
		min-height: 400px;
		img{
			width: 60px;
			height: 60px;
			
		}
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border: 0;
	}
</style>
