const { resolve } = require('path');
const { HotModuleReplacementPlugin, SourceMapDevToolPlugin, optimize: { CommonsChunkPlugin } } = require('webpack');
const { smart, smartStrategy } = require('webpack-merge');
const combineLoaders = require('webpack-combine-loaders');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const base = require('./webpack-base');
const { devServerPort } = require('./config');

const { env: { NODE_ENV, RENDERING_ON } } = process;

const client = smart(base, {
  target: 'web',
  context: resolve('app'),
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
      'redux-connect',
      'redux-form',
      'redux-thunk',
      'validator/lib/isEmail',
    ],
    client: './client',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: combineLoaders([
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: true,
              localIdentName: '[name]_[local]',
              autoprefixer: true,
            }
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: true,
            }
          },
        ]),
      },
      {
        test: /\.(png|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CommonsChunkPlugin('packages', 'commons.js'),
    new CopyWebpackPlugin([
      { from: 'index.html', to: 'index.html' },
    ]),
    new SourceMapDevToolPlugin({
      include: 'client',
      exclude: 'packages',
    }),
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
        port: devServerPort,
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
