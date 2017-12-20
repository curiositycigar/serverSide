/**
 * Created by YOU on 2017/12/8.
 */
const router = require('koa-router')()
const user = require('./controllers/user')

module.exports = function () {
  router.use('/user', user.routes(), user.allowedMethods())
  return router.routes()
}