/**
 * Created by YOU on 2017/12/20.
 */
const koaRouter = require('koa-router')()
const controller = require('./controller')

koaRouter.post('/add', controller.addArticle)
koaRouter.post('/delete', controller.deleteArticle)
koaRouter.post('/update', controller.updateArticle)
koaRouter.post('/uploadImg', controller.uploadImg)
koaRouter.get('/article/:id', controller.getArticle)
koaRouter.get('/list', controller.getArticleList)
koaRouter.get('/count', controller.getArticleCount)
koaRouter.get('/preAndNext', controller.getPreAndNextArticle)
koaRouter.get('/abstract', controller.getArticleAbstract)
koaRouter.post('/love', controller.ArticleDoLove)

module.exports = koaRouter