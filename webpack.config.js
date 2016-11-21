const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { env: { NODE_ENV } } = process;

const resolve = path.resolve;

const config = {
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
        test: /\.js/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[hash:base64:5]',
          'postcss',
          'sass'
        ),
      },
    ],
  },
  plugins: [
    new InlineEnviromentVariablesPlugin(['NODE_ENV']),
    new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js'),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      { from: 'index.html', to: 'index.html' },
    ]),
    // new HtmlWebpackPlugin(),
  ],
};

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
      new webpack.SourceMapDevToolPlugin({
        // filename: '[file].map',
        include: ['bundle.js'],
        exclude: ['commons.js'],
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    devServer: {
      port: 3000,
      hot: true,
      inline: true,
      historyApiFallback: true,
      // proxy: {
      //   '*': 'http://localhost:5000',
      // },
    },
  });
}

if (NODE_ENV === 'production') {
  module.exports = merge.smart(config, {
    devtool: 'source-map',
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        sourceMap: false,
        mangle: true,
        minimize: true
      }),
    ],
  });
}
