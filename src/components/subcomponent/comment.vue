<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<hr>
		<textarea placeholder="请输入要评论的内容" 
		maxlength="120" v-model="msg"></textarea> 
		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
			
		<div class="cmit-list">
			<div class="cmt-item" v-for="(item,i) in comments" :key="item.add_name">
				<div class="cmt-title">
					第{{ i+1 }}楼&nbsp;&nbsp;用户：{{item.user_name}}匿名用户&nbsp;&nbsp;
					发表时间 ：{{item.add_time | dataFormat}}
					
				</div>
				<div class="cmt-body">
					{{item.content === 'undefined' ? '此用户很懒' : item.content}}
				</div>
			</div>
			
		</div>
		
		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				pageindex : 1 ,// 默认展示第一页数据
				comments: [],
				msg : ''  //用于接收用户发表的评论
			};
			
		},
		mounted(){
			this.getComments();
		},
		methods:{
			// 获取评论
		getComments:async function(){ 
				let ret = await  this.$axios.get("api/getcomments/"+this.id+"?pageindex="+this.pageindex);
						// 如果下一页已经没有评论了，直接跳出
						console.log(ret);
						if(ret.message.length === 0) return Toast('没有更多评论了');
						//点击加载后不要把前面的数据覆盖
						this.comments = this.comments.concat( ret.message );
			},
			// 加载更多评论
			getMore(){
				this.pageindex++;
				this.getComments();
			},
			// 发表评论
			postComment(){
				// 校验是否为空内容
				if(this.msg.trim().length === 0){
					console.log(this.msg)
					return Toast("评论不能为空")
				}
				// 参数1 请求url地址
				// 参数2 提交给服务器数据对象
				// 参数3 定义提交的时候，表单中的数据格式 emulateJSON：true
				// 此处的id值即当前新闻页面的id，可以使用prop传过来的id值
				this.$http.post('api/postcomment/' + this.id, {content:this.msg.trim()} )
					.then(function(result){
						if(result.body.status === 0){
							// 构造一个回复用户对象	
							
							var cmt = { 
								user_name : '匿名用户', 
								add_time : Date.now(), 
								content	:this.msg.trim(),
								};
							this.comments.unshift(cmt);
							this.msg = "" ;
						}else{
							Toast('发表评论失败');
						}
					});
			}
			
		},
		//这是整页评论的id
		//newsinfo传来的参数，用来加载出对应的评论
		props:["id"]
	}
	
</script>

<style lang="scss" scoped>
	.cmt-container{
		h3{
			font-size: 18px;
		}
		textarea{
			font-size: 14px;
			height: 85px;
			margin: 0;
		}
		
		
		.cmit-list{
			margin: 5px 0;
			.cmt-item{
				font-size: 13px;
				.cmt-title{
					font-size: 13px;
					background-color: #ccc;
				}
				.cmt-body{
					line-height: 35px;
					text-indent: 2em ; /* 字符缩进*/
				}
			}
			
		}
	}
	
</style>
