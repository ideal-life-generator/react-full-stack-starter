const { resolve } = require('path');
const { BannerPlugin } = require('webpack');
const { smart } = require('webpack-merge');
const combineLoaders = require('webpack-combine-loaders');
const nodeExternals = require('webpack-node-externals');
const ReloadServerPlugin = require('reload-server-webpack-plugin');
const base = require('./webpack-base');
const client = require('./webpack-client');

const { env: { NODE_ENV } } = process;

const server = smart(base, {
  target: 'node',
  context: resolve('./app'),
  entry: {
    server: './server',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: combineLoaders([
          {
            loader: 'fake-style-loader',
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: false,
              localIdentName: '[name]_[local]',
            }
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: false,
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
  externals: [nodeExternals()],
  devtool: '#source-map',
  plugins: [
    new BannerPlugin(`require('source-map-support').install();`, { raw: true, entryOnly: false }),
  ],
});

const serverRendering = smart(client, {});

if (NODE_ENV === 'development') {
  const serverDevelopment = smart(server, {
    plugins: [
      new ReloadServerPlugin({
        script: 'build/server.js',
      }),
    ],
  });

  const serverRenderingDevelopment = smart(serverRendering, {});

  module.exports = [serverDevelopment, serverRenderingDevelopment];
}

if (NODE_ENV === 'production') {
  const serverDevelopment = smart(server, {});

  const serverRenderingDevelopment = smart(serverRendering, {});

  module.exports = [serverDevelopment, serverRenderingDevelopment];
}
