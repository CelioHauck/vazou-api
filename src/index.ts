import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
const cors = require("@koa/cors");
import { AppRoutes } from "./routes";

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors());

AppRoutes.forEach((route) => {
  router[route.method](route.path, route.action);
});

app.use(router.routes());

app.listen(3055);
console.log("listening on 3055");
