const { resolve } = require('path');
const { BannerPlugin } = require('webpack');
const { smart } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const base = require('./webpack-base');
const client = require('./webpack-client');

const { env: { NODE_ENV } } = process;

const server = smart(base, {
  target: 'node',
  context: resolve('./src'),
  entry: {
    server: './server',
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
      {
        test: /\.(png|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
  ],
});

const serverRendering = smart(client, {});

if (NODE_ENV === 'development') {
  const serverDevelopment = smart(server, {
    plugins: [
      new WebpackShellPlugin({
        onBuildEnd: ['nodemon dist/server.js --watch dist/server.js'],
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
