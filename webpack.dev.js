const getWebpackConfig = require('./webpackConfig');

module.exports = getWebpackConfig({
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    historyApiFallback: true,
    open: true,
  },
});
