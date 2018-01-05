/**
 * Created by YOU on 2017/12/20.
 */
const koaRouter = require('koa-router')();
const controller = require('./controller');
const authService = require('../../auth/auth.service');

koaRouter.post('/save', authService.authenticated(), controller.addArticle);
koaRouter.get('/delete/:id', authService.authenticated(), controller.deleteArticle);
koaRouter.post('/uploadImg', authService.authenticated(), controller.uploadImg);
koaRouter.get('/article/:id', authService.authenticated(), controller.getArticle);
koaRouter.post('/love', authService.authenticated(), controller.ArticleDoLove);

koaRouter.get('/list', controller.getArticleList);
koaRouter.get('/count', controller.getArticleCount);
koaRouter.get('/preAndNext/:id/:tag', controller.getPreAndNextArticle);
koaRouter.get('/abstract', controller.getArticleAbstract);

module.exports = koaRouter;