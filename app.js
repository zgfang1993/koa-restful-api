const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const sessionCfg = require('./config/session');
const router = require('./routers/index');
// signed指定加密的话，必须用app.keys指定加密短语。
app.keys = ['sherry secret']


app
  .use(bodyParser({
    onerror: function (err, ctx) {
      ctx.throw('body parse error', 422);
    }
  }))
  .use(session(sessionCfg, app))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log('koa-restful-api is starting at port 3000')