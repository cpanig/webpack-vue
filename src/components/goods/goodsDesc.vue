<template>
	<div class="goodsdesc-container">
		<h3>{{ info.title }}</h3>
		
		<hr>
		
		<div class="content" v-html="info.content"></div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				info : []
			}
		},
		mounted(){
			this.$axios.get("api/goods/getdesc/"+this.$route.params.id).then(data =>{
				this.info = data.message[0];
			})
		},
	}
</script>

<style lang="scss" >
	.goodsdesc-container{
		h3{
			font-size:  16px;
			color: #226aff;
			text-align: center;
			margin: 15px 0;
		}
		.content{
			img{
				width: 100%;
			}
		}
	}
</style>
