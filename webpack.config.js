// var webpack = require("webpack");
var EXCLUDE = /node_modules/;		// путь в котором не нужно искать, !!!прописывать без кавычек!!!

module.exports = {
	entry: "./src/app.js",   //точка входа
	output: {
		filename: "./dist/bundle.js"    	//исходящий файл
	},
	watch: true,			//следить за обновлениями
	// devtool: "source-map",		//инструмент для отладки в исходниках

	plugins: [
		//
		// new webpack.optimize.UglifyJsPlugin(
		// 	{
		// 		comments: false,
		// 		warnings: false
		// 	}
		// ),
		//
		// new ExtractTextPlugin("./dist/style.css"),
	],

	module : {
		loaders: [
			// {
			// 	test: /\.js$/,
			// 	loader: "babel",
			// 	exclude: EXCLUDE,
			// 	query: { presets: ["es2015"] }
			// },
			// {
			// 	test: /\.less$/,
			// 	loader: "style!css!less",
			// 	// loader: ExtractTextPlugin.extract("css!less"),  //will extract sass styles to a separate .css file
			// 	exclude: EXCLUDE
			// },
			{
				test: /\.scss$/,
				loader: "style!css!sass",					// extract styles to output js
				// loader: ExtractTextPlugin.extract("css!sass"),  //will extract sass styles to a separate .css file
				exclude: EXCLUDE
			}
			// {
			// 	test: /\.css$/,
			// 	loader: "style!css",
			// 	// loader: ExtractTextPlugin.extract("css"),  //will extract sass styles to a separate .css file
			// 	exclude: EXCLUDE
			// }
			// {
			// 	test: /\.html$/,
			// 	loader: 'html',			//turn template html document to string for appending to another element
			// 	exclude: EXCLUDE
			// }
		]
	}
};
