const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const resolve = path.resolve;

const common = {
  target: 'node',
  context: resolve('src'),
  entry: {
    'server.bundle': resolve('index.js'),
  },
  output: {
    path: resolve('dist'),
    publicPath: 'http://localhost:3000/dist/',
    filename: '[name].js',
    sourceMapFilename: "[name].js.map",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel' +
          '?cacheDirectory&presets[]=es2015' +
          ',presets[]=stage-0' +
          ',presets[]=stage-1' +
          ',presets[]=stage-2' +
          ',presets[]=react' +
          ',plugins[]=transform-decorators-legacy' +
          ',plugins[]=transform-runtime'
        ],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[hash:base64:5]',
          'postcss',
          'sass'
        ),
      },
    ],
  },
  resolve: {
    root: resolve('src'),
    extensions: ['', '.js', '.scss'],
    modulesDirectories: ['node_modules'],
  },
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server',
  ]).reduce(function (ext, mod) {
    ext[mod] = `commonjs ${mod}`;
    return ext;
  }, {}),
  node: {
    __filename: false,
    __dirname: false
  },
  plugins: [
    new InlineEnviromentVariablesPlugin(['NODE_ENV', 'TARGET']),
    new ExtractTextPlugin("server.styles.css"),
  ],
};

if (NODE_ENV === 'development') {
  module.exports = merge.smart(common, {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
            'isomorphic-style',
            'css?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]',
            'postcss',
            'sass'
          ),
        },
      ]
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.BannerPlugin('require("source-map-support").install();', {
        raw: true,
        entryOnly: false,
      }),
    ],
    devtool: 'sourcemap',
  });
}

if (NODE_ENV === 'production') {
  module.exports = merge.smart(common, {
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        sourceMap: false,
        mangle: true,
        minimize: true
      }),
    ],
  });
}
