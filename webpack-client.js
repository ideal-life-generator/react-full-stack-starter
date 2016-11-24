const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const base = require('./webpack-base');

// var info = autoprefixer({ browsers: ['last 2 version'] }).info();
// console.log(info);

const { env: { NODE_ENV } } = process;

const resolve = path.resolve;

const config = merge.smart(base, {
  target: 'web',
  context: resolve('src'),
  entry: {
    commons: [
      'axios',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-tap-event-plugin',
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
        exclude: /node_modules/,
        loaders: [
          'style',
          'css?modules&localIdentName=[name]_[local]',
          'postcss',
          'sass'
        ],
      },
    ],
  },
  // cssLoader: {
  //   modules: false,
  //   importLoaders: 1,
  //   sourceMap: true,
  //   localIdentName: '[name]_[local]_[hash:base64:5]',
  // },
  // sassLoader: {
  //   sourceMap: true,
  //   outputStyle: 'expanded',
  // },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js'),
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
