<template>
	<!-- 将来，谁使用此组件，谁传递lunboList -->
	<!-- 此时，lunbolist 应该是父组件向子组件传值爱设置 -->
	<mt-swipe :auto="4000">
	  <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
		  <!-- 这里定义了item.img作为数据名，在别的组件中使用时，要把别的属性名更改成item.img
		  否则无法使用-->
		  <img :src="item.img" alt="" :class="{'full' : isfull }">
	  </mt-swipe-item>
	
	</mt-swipe>
</template>



<script>
	// 使用该子组件的父组件会传递对应的lunbotulist给props
	export default{
		props:['lunbotuList','isfull']
	};
</script>

<style lang="scss" scoped="scoped">
	.mint-swipe{
		height: 210px;
	.mint-swipe-item{
		text-align: center;
		
		}
	
		img{
			height: 100%;
		}
	}
	
	.full{
		width: 100%;
	}
</style>
