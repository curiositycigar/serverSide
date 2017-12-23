/**
 * Created by YOU on 2017/12/5.
 */
const Koa = require('koa2')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const staticFiles = require('./server/middleware/static')
const redirect = require('./server/middleware/redirect')
const routes = require('./server/routes')()
const mongoose = require('./server/db')
const {
  preUri
} = require('./server/config')

/*
 // session for Koa
 const session = require('koa-generic-session')
 const RedisStore = require('koa-redis')
 //
 const responseTime = require('koa-response-time')
 // 日志
 const logger = require('koa-logger')
 // 压缩
 const compress = require('koa-compress')
 // 跨域
 const cors = require('kcors')
 const passport = require('koa-passport')

 */

app.on('error', (err, ctx) => {
  console.log('server err:', err.message)
})

// 简单错误处理
app.context.success = (data, message) => {
  return {
    success: '请求成功' || message,
    data: data
  }
}
app.context.error = (data, message) => {
  return {
    error: '未知错误' || message,
    data: data
  }
}

// 简单错误处理
app.use(async (ctx, next) => {
  console.log('err handling!')
  try {
    await next()
  } catch (e) {
    ctx.status = e.status || 500
    ctx.body = e
    ctx.app.emit('error', e, ctx)
  }
})

// 日志打印
app.use(async (ctx, next) => {
  console.log(`Process on ${ctx.request.method}:${ctx.request.url}...`)
  await next()
})
app.use(bodyParser())
// 静态文件
app.use(staticFiles('/static', __dirname + '/static'))
// 注册路由
app.use(routes)


// 在端口3000监听:
module.exports = app.listen(3000)
console.log('app started at port 3000...')