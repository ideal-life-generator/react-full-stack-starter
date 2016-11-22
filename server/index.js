import express from 'express';
import compression from 'compression';
import cors from 'cors';
import downloadStatic from './static';
import render from './render';
// import handleActions, * as actions from './actions';

const { env: { NODE_ENV } } = process;

const app = express();

app.use(compression());
app.use(cors());
app.use(downloadStatic());
// app.use(handleActions(actions));
app.use(render());

app.listen(5000, () => {
  console.log(`Express server running on ${5000} port in ${NODE_ENV} mode.`);
});
