<template>
	<div class="newsinfo-containter">
		<!-- 大标题 -->
		<h3 class="title">{{newsinfo.title}}</h3>
		<!-- 子标题 -->
		<p class="subtitle">
			<span>发表时间: {{newsinfo.add_time | dataFormat}}</span>
			<span>点击：{{newsinfo.click}}次</span>
		</p>
		
		<hr>
		
		<!-- 内容区域 -->
		<div class="content" v-html="newsinfo.content"></div>
		
		<!-- 评论子组件区域 -->
		<!-- 将新闻信息对应的id绑定在该子组件上，加载出对应的评论信息 -->
		<comment-box :id="this.id"></comment-box>
	</div>
</template>

<script>
	//导入评论 子组件
	import Comment from '../subcomponent/comment.vue'
	export default{
		data(){
			return{
				//获取新闻对应id值
				//每个新闻页面都有对应的id，通过该id加载出相应的新闻信息，
				id : this.$route.params.id,  
				newsinfo : {} //新闻对象
			}
		},
		created(){
			this.getNewsInfo();
		},
		methods:{
			getNewsInfo(){
				this.$http.get('api/getnew/' + this.id).then(result =>{
					if(result.body.status === 0 ){
						this.newsinfo = result.body.message[0];
					}
				})
			}
		},
		components:{
			'comment-box' : Comment
		}
	}
</script>

<style lang="scss" scoped>
	.newsinfo-containter{
		padding: 0 4px;
		.title{
			font-size: 16px;
			text-align: center;
			margin: 15px 0;
			color: red;
		}
		.subtitle{
			font-size: 13px;
			color: #226aff;
			display: flex;
			justify-content: space-between;
		}
		.content{}
	}
	
</style>
