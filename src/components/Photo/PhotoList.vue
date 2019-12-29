<template>
	<div>
		<!-- 顶部滑动条区域 -->
	<div id="slider" class="mui-slider ">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id === 0 ? 'mui-active' : ''] " v-for="item in cates" :key="item.id" 
						@click="getPhotoListByCateId(item.id)">
							{{ item.title }}
						</a>
					</div>
				</div>

			</div>		
	
			<!-- 图片区域 -->
			<ul class="photo-list">
			  <router-link :to="'/home/photoinfo/' + item.id" tag="li"  v-for="item in list" :key="item.id">
			    <img v-lazy="item.img_url" >
				<div class="info">
					<h1 class="info-title">{{item.title}}</h1>
					<div class="info-body">{{item.zhaiyao}}</div>
				</div>
			  </router-link>
			</ul>
			
	</div>


	
</template>

<script>
	import mui from '../../lib/mui/js/mui.js'
	export default{
		data(){
			return{
				cates : [], //分类数组
				list : []	//图片列表数组
			};
		},
		mounted(){	//当组件中DOM的结构被渲染好并放到页面中后,再执行钩子函数
			this.$axios.get('api/getimgcategory').then(data =>{
				//在最前面加一个全部分类，默认加载
				data.message.unshift({ title : "全部", id : 0 });
				this.cates = data.message;
			});
			//切换标签时加载对应id的图片
			this.getPhotoListByCateId(0); 		
			//初始化滑动控件
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		methods:{
			getPhotoListByCateId(cateId){
				//根据分类id ，获取图片列表
				this.$axios.get('api/getimages/' +cateId).then(data =>{
						this.list = data.message;
				})
			}
		}
	};
	
	
	
</script>

<style lang="scss" scoped>
	
	.photo-list{
		
		list-style: none;
		margin: 0;
		padding: 10px;
		padding-bottom: 0;
		li{
			box-shadow: 0 0 9px #999;
			margin-bottom: 10px;
			backgrou:  #ccc;
			text-align: center;
			position: relative;
			img{
				width: 100%;
				vertical-align: middle;
			}
			img[lazy=loading] {
			  width: 40px;
			  height: 300px;
			  margin: auto;
			}
			
			.info{
				max-height: 84px;
				color: white;
				text-align: left;
				position: absolute;
				bottom: 0;
				background-color: rgba(0,0,0,0.4);
				.info-title{
					font-size: 14px;
				}
				.info-body{
					font-size: 13px;
				}
			}
		}
		
	}
</style>
