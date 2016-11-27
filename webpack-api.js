const { smart } = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { api } = require('./webpack-base');

const { env: { NODE_ENV } } = process;

if (NODE_ENV === 'development') {
  module.exports = smart(api, {
    plugins: [
      new WebpackShellPlugin({
        onBuildEnd: ['nodemon dist/api.js --watch dist/api.js'],
      }),
    ],
  });
}

if (NODE_ENV === 'production') {
  module.exports = smart(api, {});
}
