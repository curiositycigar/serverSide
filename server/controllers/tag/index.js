/**
 * Created by YOU on 2017/12/21.
 */
const koaRouter = require('koa-router')()
const controller = require('./controller')

koaRouter.get('/add/:name', controller.addTag)
koaRouter.get('/delete/:name', controller.deleteTag)
koaRouter.get('/update/:name', controller.updateTag)

module.exports = koaRouter