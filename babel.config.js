
//cnpm i babel-loader @babel/core @babel/runtime -D

//cnpm i @babel/preset-env 
//		@babel/plugin-transform-runtime 
//		@babel/plugin-proposal-class-properties -D
// 


module.exports={
	"presets":['@babel/preset-env'],
	"plugins":['@babel/plugin-transform-runtime',
	'@babel/plugin-proposal-class-properties',
	"transform-remove-strict-mode"],
	"ignore":[
		"./src/lib/mui/js/mui.js"
	]
}