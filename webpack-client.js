const { HotModuleReplacementPlugin } = require('webpack');
const { smart, smartStrategy } = require('webpack-merge');
const { client } = require('./webpack-base');

const { env: { NODE_ENV } } = process;

if (NODE_ENV === 'development') {
  module.exports = smartStrategy({
    'entry.packages': 'prepend',
  })(client, {
    entry: {
      packages: [
        'react-hot-loader/patch',
        'redux-devtools',
        'redux-devtools-dock-monitor',
        'redux-devtools-log-monitor',
      ],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['react-hot-loader/webpack'],
        },
      ],
    },
    plugins: [
      new HotModuleReplacementPlugin(),
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
  module.exports = smart(client, {});
}
