<template>

	<div class="mui-numbox" data-numbox-min='1' data-numbox-max='max'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" 
		@change="countChanged" ref="numbox"/>
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
			//每当 文本框的数据修改，立即将最新的数据通过事件调用，传递给父组件
			countChanged(){
				this.$emit('getcount',parseInt(this.$refs.numbox.value));
			}
		},
		
		props:["max"],
		watch:{
			'max':function(newVal,oldVal){
				mui(".mui-numbox").numbox().setOption('max',newVal)
			}
		}
	}
</script>

<style>
</style>
