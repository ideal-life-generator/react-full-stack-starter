const webpack = require('webpack');
const merge = require('webpack-merge');
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { env: { NODE_ENV } } = process;

const config = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new InlineEnviromentVariablesPlugin(['NODE_ENV']),
    new CleanWebpackPlugin(['dist'], { 'verbose': false }),
  ],
};

if (NODE_ENV === 'development') {
  module.exports = merge.smart(config, {
    plugins: [
      new webpack.NoErrorsPlugin(),
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