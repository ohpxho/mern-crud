const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd() 
const nodeExternals = require('webpack-node-externals');

const config = {
	name: 'server',
	target: 'node',
	entry: [path.join(CURRENT_WORKING_DIR, './server/server.js')],
	output: {
		path: path.join(CURRENT_WORKING_DIR, '/dist'),
		filename: 'server.generated.js',
		publicPath: '/dist/',
		libraryTarget: 'commonjs2'
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
}

module.exports = config