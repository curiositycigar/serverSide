/**
 * Created by YOU on 2017/12/20.
 */
const admin = require('../../config').auth.admin;
const koaRouter = require('koa-router')();
const controller = require('./controller');
const authService = require('../../auth/auth.service');
// 无权限要求
koaRouter.get('/info/:name', controller.getUserInfo);
koaRouter.post('/register', controller.register);
koaRouter.get('/active/:code', controller.activeMail);
koaRouter.get('/isUserNameExist/:name', controller.isUserNameExist);
koaRouter.get('/isMailExist/:mail', controller.isMailExist);
// 用户
koaRouter.get('/me', authService.authenticated(), controller.getUserInfoBySelf);
koaRouter.post('/update', authService.authenticated(), controller.updateUserBySelf);
koaRouter.post('/password', authService.authenticated(), controller.changePasswordBySelf);
koaRouter.post('/doFollow/:id', authService.authenticated(), controller.doFollow);
koaRouter.post('/undoFollow/:id', authService.authenticated(), controller.undoFollow);
koaRouter.post('/doCollection/:id', authService.authenticated(), controller.doCollection);
koaRouter.post('/undoCollection/:id', authService.authenticated(), controller.undoCollection);
// 登录且为管理员
koaRouter.get('/admin/user/:name', authService.authenticated(admin), controller.getUserInfoByAdmin);
koaRouter.get('/admin/list', authService.authenticated(admin), controller.getUserListByAdmin);
koaRouter.post('/admin/add', authService.authenticated(admin), controller.addUserByAdmin);
koaRouter.post('/admin/userPassword', authService.authenticated(admin), controller.changePasswordByAdmin);
koaRouter.post('/admin/delete', authService.authenticated(admin), controller.deleteUserByAdmin);
koaRouter.get('/admin/ban/:name', authService.authenticated(admin), controller.banUserByAdmin);

module.exports = koaRouter;