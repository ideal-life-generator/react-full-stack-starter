const { resolve } = require('path');
const { DefinePlugin, SourceMapDevToolPlugin, HotModuleReplacementPlugin, optimize: { CommonsChunkPlugin, OccurenceOrderPlugin, DedupePlugin, UglifyJsPlugin } } = require('webpack');
const { smart, smartStrategy } = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const { stringify } = JSON;

const { env: { NODE_ENV, RENDERING_ON } } = process;

const base = {
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
  },
    // eslint: {
    //     configFile: '.eslintrc',
    //     failOnWarning: false,
    //     failOnError: false
    // },
  module: {
    // preLoaders: [
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/,
    //             loader: 'eslint'
    //         }
    //     ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new DefinePlugin({
      process: {
        env: {
          NODE_ENV: stringify(NODE_ENV),
          RENDERING_ON: stringify(RENDERING_ON),
        },
      },
    }),
  ],
};

const client = {
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
  // devtool: '#cheap-module-eval-source-map',
  plugins: [
    // new SourceMapDevToolPlugin({
    //   include: ['main.js'],
    //   // exclude: ['commons.js'],
    //   module: true,
    //   columns: true,
    //   lineToLine: true,
    // }),
    new CommonsChunkPlugin('packages', 'commons.js'),
    new CopyWebpackPlugin([
      { from: 'index.html', to: 'index.html' },
    ]),
  ],
};

const server = {
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
};

const serverRendering = client;

const api = {
  target: 'node',
  context: resolve('./'),
  entry: {
    api: './api',
  },
  externals: [nodeExternals()],
};

if (NODE_ENV === 'development') {
  const baseDevelopment = smart(base, {});

  module.exports = {
    client: smart(baseDevelopment, client),
    server: smart(baseDevelopment, server),
    serverRendering: smart(baseDevelopment, serverRendering),
    api: smart(baseDevelopment, api),
  };
}

if (NODE_ENV === 'production') {
  const baseProduction = smart(base, {
    plugins: [
      new OccurenceOrderPlugin(),
      new UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        sourceMap: false,
        mangle: true,
        minimize: true
      }),
    ],
  });

  module.exports = {
    client: smart(baseProduction, client),
    server: smart(baseProduction, server),
    serverRendering: smart(baseProduction, serverRendering),
    api: smart(baseProduction, api),
  };
}
