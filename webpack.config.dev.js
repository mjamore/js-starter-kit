import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	devtool: 'inline-source-map',
	entry: [
		path.resolve(__dirname, 'src/index')
	],
	mode: 'development',
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'src'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new Dotenv(),
		// Create HTML file that includes reference to bundled JS.
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true
		})
	],
	module: {
		rules: [
			{
				test: /.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			},
			{
				test: /.css$/,
				loaders: ['style-loader', 'css-loader']
			}
		]
	},
	node: {
		fs: "empty"
	}
}
