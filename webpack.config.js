
const path = require('path');
const webpack = require('webpack');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

const include = [
	path.resolve(__dirname, 'dev'),
	path.resolve(__dirname, 'src'),
	path.resolve('node_modules', '@pierian')
];

module.exports = function() {

	let config = {};

	if (isProd) {
		config.devtool = 'source-map';
	}

	config.debug = !isProd || !isTest;
	config.cache = true;

	config.entry = isTest ? {} : {
		polyfills: path.resolve(__dirname, 'dev', 'polyfills.ts'),
		vendors: path.resolve(__dirname, 'dev', 'vendors.ts'),
		app: path.resolve(__dirname, 'dev', 'main.ts')
	};

	config.output = isTest ? {} : {
		path: path.resolve(__dirname, 'dev'),
		filename: '[name].js'
	};


	config.resolve = {
		cache: !isTest,
		root: [
			path.join( __dirname, 'dev' )
		],
		extensions: ['', '.ts', '.js', '.scss', '.html']
	};

	config.module = {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'babel!awesome-typescript',
				include
			},
			{
				test: /.scss$/,
				loader: 'style!css!postcss!sass',
				include
			},
			{
				test: /.html$/,
				loader: 'raw?html-minify',
				include
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline!html-minify',
				include
			},
			{
				test: /\.json$/,
				loader: 'json',
				include
			},

		],
		postLoaders: []
	};

	config['html-minify-loader'] = {
		empty: true,
		dom: {
			lowerCaseAttributeNames: false,
		}
	};

	config.plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				ENV: JSON.stringify(ENV)
			}
		})
	];

	config.postcss = [
		autoprefixer({
			browsers: ['last 2 version']
		})
	];


	if (!isTest) {
		config.plugins.push(
				new CommonsChunkPlugin({
					name: ['vendors', 'polyfills']
				}),

				new HtmlWebpackPlugin({
					template: 'dev/app/index.ejs',
					envDev: !isProd,
					envProd: isProd
				})
		);
	}

	config.devServer = {
		contentBase: './dev',
		historyApiFallback: true,
		stats: 'minimal'
	};

	return config;
}();


// Helper functions
function root(args) {
	args = Array.prototype.slice.call(arguments, 0);
	return path.join.apply(path, [__dirname].concat(args));
}