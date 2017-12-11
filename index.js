/**
 * Created by YOU on 2017/12/5.
 */
const Koa = require('koa2')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const staticFiles = require('./middleware/static.js')
const routes = require(__dirname + '/controller.js')()

app.on('error', (err, ctx) => {
  console.error('server err:', err, ctx)
})

app.use(async (ctx, next) => {
  console.log(`Process on ${ctx.request.method}:${ctx.request.url}...`)
  await next()
})

app.use(bodyParser())

app.use(staticFiles('/static', __dirname + '/static'))
app.use(routes)


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');