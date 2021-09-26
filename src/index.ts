import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
const cors = require('@koa/cors');
import { AppRoutes } from './routes';
// process.env.TZ = 'America/Sao_Paulo';
// console.log(new Date());

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors());

AppRoutes.forEach((route) => {
  router[route.method](route.path, route.action);
});

app.use(router.routes());
