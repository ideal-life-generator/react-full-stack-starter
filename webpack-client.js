const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const base = require('./webpack-base');

const { env: { NODE_ENV } } = process;

const resolve = path.resolve;

const config = merge.smart(base, {
  target: 'web',
  context: resolve('src'),
  entry: {
    commons: [
      'isomorphic-fetch',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
    ],
    bundle: './index',
  },
  output: {
    path: resolve('dist'),
    // publicPath: '/dist/',
    // filename: '[name].js',
    // sourceMapFilename: "[name].js.map",
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules',
          'postcss',
          'sass'
        ),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js'),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      { from: 'index.html', to: 'index.html' },
    ]),
    new webpack.SourceMapDevToolPlugin({
      // filename: '[file].map',
      include: ['bundle.js'],
      exclude: ['commons.js'],
    }),
  ],
});

if (NODE_ENV === 'development') {
  module.exports = merge.smart(config, {
    entry: {
      commons: [
        // 'redux-devtools',
        // 'redux-devtools-log-monitor',
        // 'redux-devtools-dock-monitor',
        // 'containers/DevTools',
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      port: 3000,
      hot: true,
      inline: true,
      historyApiFallback: true,
    },
  });
}

if (NODE_ENV === 'production') {
  module.exports = config;
}
