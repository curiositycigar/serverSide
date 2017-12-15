/**
 * Created by YOU on 2017/12/5.
 */
const Koa = require('koa2')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const staticFiles = require('./middleware/static.js')
const redirect = require('./middleware/redirect.js')
const routes = require(__dirname + '/controller.js')()
const dbConnection = require('./modules/db')
const {
  preUri
} = require('./config')

app.on('error', (err, ctx) => {
  console.error('server err:', err, ctx)
})
// 日志打印
app.use(async (ctx, next) => {
  console.log(`Process on ${ctx.request.method}:${ctx.request.url}...`)
  await next()
})

app.use(bodyParser())
// 重定向
app.use(redirect(preUri))
// 静态文件
app.use(staticFiles('/static', __dirname + '/static'))
// 注册路由
app.use(routes)


// 在端口3000监听:
app.listen(3000)
console.log('app started at port 3000...')