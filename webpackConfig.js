require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getWebpackConfig(config) {
  const isProduction = config.mode === 'production';
  const environmentStyleLoader = isProduction
    ? MiniCssExtractPlugin.loader
    : 'vue-style-loader';

  return {
    ...config,
    target: 'web',
    entry: path.join(__dirname, 'src/main.ts'),
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          // https://github.com/webpack/webpack/issues/11467
          test: /\.m?js$/,
          loader: 'babel-loader',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/,
          use: [environmentStyleLoader, 'css-loader'],
        },
        {
          test: /\.(sa|sc)ss$/,
          exclude: /\.temp\.sass$/i,
          use: [
            environmentStyleLoader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  indentedSyntax: true,
                },
              },
            },
          ],
        },
        {
          test: /\.temp\.sass$/i,
          use: [
            // Ordering matters! style-loader should be executed last.
            {
              loader: 'style-loader',
              options: {
                injectType: 'lazySingletonStyleTag',
                attributes: { id: 'temp-style-tag' },
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: 'assets',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.vue'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BASE_URL': JSON.stringify('/'),
      }),
      new HTMLWebPackPlugin({
        template: path.join(__dirname, 'public/index.html'),
        favicon: path.join(__dirname, 'public/favicon.ico'),
        title: 'Chat App',
      }),
      new VueLoaderPlugin(),
      new VuetifyLoaderPlugin(),
    ].concat(isProduction ? new MiniCssExtractPlugin() : []),
  };
}

module.exports = getWebpackConfig;
