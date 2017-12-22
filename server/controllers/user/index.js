/**
 * Created by YOU on 2017/12/20.
 */
const koaRouter = require('koa-router')()
const controller = require('./controller')
// 无权限要求
koaRouter.get('/info/:name', controller.getUserInfo)
koaRouter.post('/register', controller.register)
koaRouter.get('/active/:code', controller.activeMail)
koaRouter.get('/isUserNameExist/:name', controller.isUserNameExist)
koaRouter.get('/isMailExist/:mail', controller.isMailExist)
// 登录
koaRouter.post('/login', controller.login)
koaRouter.post('/info', controller.getUserInfoBySelf)
koaRouter.post('/update', controller.updateUserBySelf)
koaRouter.post('/password', controller.changePasswordBySelf)
// 登录且为管理员
koaRouter.get('/admin/list', controller.getUserListByAdmin)
koaRouter.post('/admin/add', controller.addUserByAdmin)
koaRouter.post('/admin/userPassword', controller.changePasswordByAdmin)
koaRouter.post('/admin/delete', controller.deleteUserByAdmin)
koaRouter.post('/admin/ban', controller.banUserByAdmin)

module.exports = koaRouter