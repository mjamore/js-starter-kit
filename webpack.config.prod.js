import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
	devtool: 'source-map',
	entry: {
		main: path.resolve(__dirname, 'src/index'),
		vendor: path.resolve(__dirname, 'src/vendor')
	},
	mode: 'development',
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js'
	},
	plugins: [
		new Dotenv(),
		// Create HTML file that includes reference to bundled JS.
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			trackJSToken: '1ca0f49fa2f04fa58bccebb7c9afa281'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].css'
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
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	node: {
		fs: "empty"
	},
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	}
}
