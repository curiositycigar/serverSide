/**
 * Created by YOU on 2017/12/5.
 */
const fs = require('fs');
const http = require('http');
const https = require('https');
const Koa = require('koa2');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const {
  port,
} = require('./server/config').server;
const staticFiles = require('./server/middleware/static');
const redirect = require('./server/middleware/redirect');
const routes = require('./server/routes')();
const mongoose = require('./server/db');
const {
  preUri
} = require('./server/config');

console.log('webServer started on ' + process.pid);

app.on('error', (err, ctx) => {
  console.log('server err:', err.message)
});

// 封装数据
app.context.success = (data, message) => {
  return {
    success: '请求成功' || message,
    data: data
  }
};
app.context.failure = (data, message) => {
  return {
    error: '未知错误' || message,
    data: data
  }
};

// 错误处理
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.status = e.status || 500;
    ctx.body = e;
    ctx.app.emit('error', e, ctx)
  }
});

// 日志打印
app.use(async (ctx, next) => {
  console.log(`Process on ${ctx.request.method}:${ctx.request.url}...`);
  await next()
});
app.use(bodyParser());
// 静态文件
// app.use(staticFiles('/', __dirname + '/static'));
// 注册路由
app.use(routes);

let server = http.createServer(app.callback());
let httpsServer = https.createServer({
  key: fs.readFileSync('./ca/test-key.pem'),
  ca: fs.readFileSync('./ca/test-csr.pem'),
  cert: fs.readFileSync('./ca/test-cert.pem'),
  passphrase: '123456',
}, app.callback());

process.on('message', (msg, socket) => {
  console.log(process.pid + ' is handling');
  if (msg === 'http') {
    process.nextTick(() => {
      socket.readable = socket.writable = true;
      socket.resume();
      socket.server = server;
      server.emit('connection', socket);
      socket.emit('connect')
    })
  } else if (msg === 'https') {
    socket.readable = socket.writable = true;
    socket.resume();
    socket.server = httpsServer;
    httpsServer.emit('connection', socket);
    socket.emit('connect')
  }
});