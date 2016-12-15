const { resolve } = require('path');
const { BannerPlugin } = require('webpack');
const { smart } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const ReloadServerPlugin = require('reload-server-webpack-plugin');
const base = require('./webpack-base');

const { env: { NODE_ENV } } = process;

const api = smart(base, {
  target: 'node',
  context: resolve('./'),
  entry: {
    api: './api',
  },
  externals: [nodeExternals()],
  devtool: '#source-map',
  plugins: [
    new BannerPlugin('require(\'source-map-support\').install();', { raw: true, entryOnly: false }),
  ],
});

if (NODE_ENV === 'development') {
  module.exports = smart(api, {
    plugins: [
      new ReloadServerPlugin({
        script: 'build/api.js',
      }),
    ],
  });
}

if (NODE_ENV === 'production') {
  module.exports = smart(api, {});
}
