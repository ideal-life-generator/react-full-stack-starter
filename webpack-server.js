const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const { env: { NODE_ENV } } = process;

const resolve = path.resolve;

const config = {
  target: 'node',
  context: resolve('./'),
  entry: './server',
  output: {
    path: resolve('dist'),
    filename: 'server.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loader: 'ignore',
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new InlineEnviromentVariablesPlugin(['NODE_ENV']),
    // new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js'),
    new CleanWebpackPlugin(['dist'], { 'verbose': false }),
    // new webpack.IgnorePlugin(/\.scss$/),
    new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
  ],
};

if (NODE_ENV === 'development') {
  module.exports = merge.smart(config, {
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        include: ['server.js'],
        // exclude: ['commons.js'],
      }),
      new webpack.NoErrorsPlugin(),
      new WebpackShellPlugin({
        onBuildEnd: ['node dist/server.js'],
      }),
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
