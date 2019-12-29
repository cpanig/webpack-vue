<template>
	<div class="photoinfo-container">
		<h3>{{ photoinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间:{{ photoinfo.add_time | dataFormat }}</span>
			<span>点击次数:{{ photoinfo.click}}</span>
		</p>
		
		<hr>
		<!-- 缩略图区域 -->
		 <vue-preview :slides="list" @close="handleClose" class="gallery"></vue-preview>
		<!-- 文字区域 -->
		<div class="content" v-html="photoinfo.content"></div>
		
		<!-- 评论子组件 -->
		<cmt-box :id="id"></cmt-box>
	</div>
</template>

<script>
	// 导入评论子组件
	import Comment from '../subcomponent/comment.vue'
	export default{
		data(){
			return{
				id : this.$route.params.id  ,//这个可以获取路由地址上那个：id的值
				photoinfo : {} ,//图片详情	
				list : [] //缩略图数组
			}
		},
		mounted(){
			this.$axios.get('api/getimageInfo/' + this.id).then(data =>{
				this.photoinfo = data.message[0];
			})
			this.$axios.get('api/getthumimages/' + this.id).then(data =>{
				data.message.forEach(item =>{
					item.w = 600;
					item.h = 400;
					item.msrc = item.src;	
				});
				this.list = data.message;
			})
		},
		methods:{
			handleClose () {
			        console.log('close event')
			      }
			
		},
		components:{
			'cmt-box' : Comment  //注册评论子组件,不写会出错!
		}
	}
</script>

<style lang="scss" >
	.photoinfo-container{
		padding: 3px;
		h3{
			color: #26A2FF;
			font-size: 15px;
			text-align: center;
			margin: 15px 0 ;
		}
		.subtitle{
			display: flex;
			justify-content: space-between;
			font-size: 13px;
		}
		.content{
			font-size: 13px;
		}
		.gallery{
			.my-gallery{
				display: flex;
				flex-flow: wrap row; 
			figure{
				margin: 5px;
				img{
					
					width: 100px;
					box-shadow: 0 0 8px #999;
				}
			}
				
			
			}
			
		}
	}
</style>
