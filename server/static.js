import path from 'path';
import express from 'express';
import httpProxy from 'http-proxy';

const { env: { NODE_ENV } } = process;

const proxy = httpProxy.createProxyServer();

export default () => {
  if (NODE_ENV === 'production') {
    express.static(path.join(__dirname));
  } else if (NODE_ENV === 'development') {
    return (req, res) => {
      proxy.web(req, res, {
        target: 'http://localhost:3000',
      });
    };
  }
};
