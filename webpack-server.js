const { smart } = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { server, serverRendering } = require('./webpack-base');

const { env: { NODE_ENV } } = process;

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
