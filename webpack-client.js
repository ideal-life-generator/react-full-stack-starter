const { resolve } = require('path');
const { HotModuleReplacementPlugin, optimize: { CommonsChunkPlugin } } = require('webpack');
const { smart, smartStrategy } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const base = require('./webpack-base');

const { env: { NODE_ENV, RENDERING_ON } } = process;

const client = smart(base, {
  target: 'web',
  context: resolve('src'),
  entry: {
    packages: [
      'axios',
      'material-ui',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-tap-event-plugin',
      'redux',
      'redux-form',
      'redux-thunk',
    ],
    bundle: './index',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]_[local]',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ],
  },
  // cssLoader: {
  //   modules: false,
  //   importLoaders: 1,
  //   sourceMap: true,
  //   localIdentName: '[name]_[local]_[hash:commons64:5]',
  // },
  // sassLoader: {
  //   sourceMap: true,
  //   outputStyle: 'expanded',
  // },
  plugins: [
    new CommonsChunkPlugin('packages', 'commons.js'),
    new CopyWebpackPlugin([
      { from: 'index.html', to: 'index.html' },
    ]),
  ],
});

if (NODE_ENV === 'development') {
  if (RENDERING_ON === 'client') {
    module.exports = smartStrategy({
      'entry.packages': 'prepend',
    })(client, {
      entry: {
        packages: [
          'react-hot-loader/patch',
          'react-hot-loader',
          'redux-devtools',
          'redux-devtools-dock-monitor',
          'redux-devtools-log-monitor',
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

  if (RENDERING_ON === 'server') {
    module.exports = smart(client, {});
  }
}

if (NODE_ENV === 'production') {
  module.exports = smart(client, {});
}
