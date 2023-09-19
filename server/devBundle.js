const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.client.js');

const compile = (app) => {
	try {
		if(process.env.NODE_ENV == 'development') {
			const compiler = webpack(webpackConfig);
			const middleware = webpackMiddleware(compiler, {
				publicPath: webpackConfig.output.publicPath
			});
			app.use(middleware)
			app.use(webpackHotMiddleware(compiler));
		}
	} catch(err) {
		console.error(err);
	}
};

module.exports = {compile}


