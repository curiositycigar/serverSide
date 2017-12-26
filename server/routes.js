/**
 * Created by YOU on 2017/12/8.
 */
const router = require('koa-router')()
const user = require('./controllers/user')
const auth = require('./auth')

module.exports = function () {
  router.use('/user', user.routes(), user.allowedMethods())
  router.use('/auth', auth.routes(), auth.allowedMethods())
  return router.routes()
}