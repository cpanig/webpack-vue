<template>
	<div class="app-container">
		<!-- 顶部Header 区域 -->
		<mt-header fixed title="主页面">
			<!-- 返回按钮 -->
		 <span  slot="left" @click="goback" v-show="flag">
		    <mt-button icon="back">返回</mt-button>
		  </span>  
		</mt-header>	
		
		<!-- 中间的 路由 router-view 区域 -->
		<transition>
			<router-view></router-view>
		</transition>
		
		<!-- 底部Tabbar 区域 -->
		<nav class="mui-bar mui-bar-tab">
					<router-link class="mui-tab-item" to="/home">
						<span class="mui-icon mui-icon-home"></span>
						<span class="mui-tab-label">首页</span>
					</router-link>
					<router-link class="mui-tab-item" to="/member">
						<span class="mui-icon mui-icon-contact"></span>
						<span class="mui-tab-label">会员</span>
					</router-link>
					<router-link class="mui-tab-item" to="/shopcar">
						<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
							<span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
						</span>
						<span class="mui-tab-label" >购物车</span>
					</router-link>
					<router-link class="mui-tab-item" to="/search">
						<span class="mui-icon mui-icon-search"></span>
						<span class="mui-tab-label">搜索</span>
					</router-link>
				</nav>
						
	</div>

</template>

<script>
	export default{
		data(){
			return {
				flag :  false
			};
		},
		created(){
			// 在页面加载完成后，判断当前路由值，如果是home，则隐藏，否则显示
			this.flag = this.$route.path === "/home" ? false : true ; 
		},
		methods:{
			goback(){
				this.$router.go(-1);
			}
		},
		watch:{
			'$route.path':function(newVal){
				if(newVal === '/home'){
					this.flag = false ;
				}else{
					this.flag = true ;
				}
			}
		}
	}
</script>

<style scoped>
	
	.app-container{
		
		padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden;
		mt-header{
			z-index: 20;
		}
		.mui-bar{
			z-index: 100;
		}
	}
	
	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	/* 视觉错误:动画是向左移动了,但是实际位置还在原位,然后把他的放到-100%的地方去 */
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	
	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease;
	}
</style>
