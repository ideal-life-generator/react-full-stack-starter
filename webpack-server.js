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
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'ignore',
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
  ],
});

if (NODE_ENV === 'development') {
  module.exports = merge.smart(config, {
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        include: ['server.js'],
      }),
      new WebpackShellPlugin({
        onBuildEnd: ['node dist/server.js'],
      }),
    ],
  });
}

if (NODE_ENV === 'production') {
  module.exports = config;
}
