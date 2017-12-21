/**
 * Created by YOU on 2017/12/20.
 */
const koaRouter = require('koa-router')()
const controller = require('./controller')

koaRouter.post('/add', controller.addComment)
koaRouter.post('/delete', controller.deleteComment)
koaRouter.post('/list', controller.getCommentList)

module.exports = koaRouter