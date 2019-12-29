<template>

	<div class="mui-numbox" data-numbox-min='1' data-numbox-max='max' style="height:25px;">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" 
		@change="countChanged" ref="numbox" readonly="readonly"/>
		<button class="mui-btn mui-btn-numbox-plus" type="sbutton">+</button>
	</div>
</template>

<script>
	import mui from "../../lib/mui/js/mui.js"
	export default{
		mounted(){
			//初始化
			mui(".mui-numbox").numbox();
		},
		methods:{
			// 当数值改变时，触发该方法
			// 触发vuex里的updateGoodsInfo方法，将id和count值传给vuex
			countChanged(){
			this.$store.commit("updateGoodsInfo",{
				id: this.goodsId,
				count: this.$refs.numbox.value 
			})
		},		
	},
		props:['initcount','goodsId']
	}
</script>

<style>
</style>
