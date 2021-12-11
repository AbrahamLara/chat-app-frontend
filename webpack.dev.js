const getWebpackConfig = require('./webpackConfig');

module.exports = getWebpackConfig({
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    historyApiFallback: true,
    open: true,
    host: process.env.DEV_SERVER_HOST,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
