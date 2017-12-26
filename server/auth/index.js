/**
 * Created by YOU on 2017/12/20.
 */
// 签发和验证token
const modelDir = require('../config').mongo.modelDir
const User = require(modelDir).User
const koaRouter = require('koa-router')()
const {
  encryptPassword,
} = require('../utils')

const setToken = require('./auth.service').setToken

// 登录(设置token)
koaRouter.post('/login', async (ctx, next) => {
  let loginData = {
    name: ctx.request.body.name,
    // password: ctx.request.body.password,
  }
  let userData = null
  try {
    userData = await User.findOne(loginData)
  } catch (e) {
    ctx.throw(e)
  }
  if (userData) {
    if (encryptPassword(ctx.request.body.password, userData.salt) === userData.hashedPassword) {
      // 更新上次登录时间， 登录总次数
      ctx.state.user = userData
      return await next()
    } else {
      return ctx.throw(400, '密码错误')
    }
  } else {
    return ctx.throw(400, '用户名不存在')
  }
}, setToken)

// 登出
koaRouter.get('logout', async (ctx, next) => {
  // 清除token
  ctx.cookies.set('token', '')
  ctx.response.body = ctx.success(true)
})

module.exports = koaRouter