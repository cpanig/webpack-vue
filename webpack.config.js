
 
const path = require('path');

const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const htmlWebpackPlugin = require('html-webpack-plugin');



var config = {
	entry:'./src/index.js',  						

	output:{												
		path:path.resolve(__dirname,'dist'),		
		filename:'bundles.js'  								
	},
	mode: 'development',							
	
	 plugins: [
		new htmlWebpackPlugin({
			 template: ('./src/index.html'),		
			 filename: 'index.html'								
		}),
		new VueLoaderPlugin(),
	],
	devServer:{
		contentBase: './src',
		host: '192.168.1.5',	//192.168.1.5 本地wifi测试ip
		port : '3000',
		open : true ,
		hot : true ,
	},
	
	module:{ 
		rules: [

			{ test: /\.vue$/, use: 'vue-loader' },
			{ test: /\.css$/, use:['style-loader','css-loader'] }, 
			{ test: /\.less$/, use:['style-loader','css-loader','less-loader'] },
			{ test: /\.scss$/, use:['style-loader','css-loader','sass-loader'] },
			{ test: /\.(jpg|png|gif|bmp|jpeg)$/ , use: 'url-loader?limit=10000&name=[hash:8]-[name].[ext]'},
			{ test: /\.js$/, use:'babel-loader', exclude:/node_modules/},
			{ test: /\.(ttf|eot|svg|woff|woff2)$/, use:'url-loader'}, 
		]
	},
	externals: {
	
	  mui: 'mui'
	
	}
};

module.exports = config;
