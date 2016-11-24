const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const base = require('./webpack-base');

const { env: { NODE_ENV } } = process;

const resolve = path.resolve;

const config = merge.smart(base, {
  target: 'node',
  context: resolve('./'),
  entry: './server',
  output: {
    path: resolve('dist'),
    filename: 'server.js',
    sourceMapFilename: 'server.js.map',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'fake-style-loader',
          'css-loader?modules&localIdentName=[name]_[local]',
          'sass-loader',
        ],
      },
    ],
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
  plugins: [
    // new webpack.SourceMapDevToolPlugin({
    //   module: true,
    //   columns: true,
    //   lineToLine: true,
    // }),
    // new webpack.BannerPlugin('require("source-map-support").install();', {
    //   raw: true,
    //   entryOnly: false,
    // }),
  ],
});

if (NODE_ENV === 'development') {
  module.exports = merge.smart(config, {
    plugins: [
      new WebpackShellPlugin({
        onBuildEnd: ['node dist/server.js'],
      }),
    ],
  });
}

if (NODE_ENV === 'production') {
  module.exports = config;
}
