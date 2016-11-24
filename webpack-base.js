const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { env: { NODE_ENV } } = process;

const config = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { 'verbose': false }),
    new InlineEnviromentVariablesPlugin(['NODE_ENV']),
  ],
};

if (NODE_ENV === 'development') {
  module.exports = merge.smart(config, {
    plugins: [
      // new webpack.NoErrorsPlugin(),
    ],
  });
}

if (NODE_ENV === 'production') {
  module.exports = merge.smart(config, {
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