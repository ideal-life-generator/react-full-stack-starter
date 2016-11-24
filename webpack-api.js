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
  entry: './api',
  output: {
    path: resolve('dist'),
    filename: 'api.js',
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();', {
      raw: true,
      entryOnly: false,
    }),
  ],
});

if (NODE_ENV === 'development') {
  module.exports = merge.smart(config, {
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        include: ['api.js'],
      }),
      new WebpackShellPlugin({
        onBuildEnd: ['nodemon dist/api.js'],
      }),
    ],
  });
}

if (NODE_ENV === 'production') {
  module.exports = config;
}
