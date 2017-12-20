/**
 * Created by YOU on 2017/12/20.
 */
const router = require('koa-router')()
const controller = require('./controller')
// 无权限要求
router.get('/userInfo/:username', controller.getUserInfo)
router.post('/register', controller.register)
router.get('/active/:random', controller.activeMail)
// 登录
router.post('/login', controller.login)
router.post('/info', controller.getUserInfoBySelf)
router.post('/update', controller.updateUserBySelf)
// 登录且为管理员
router.get('/userList', controller.getUserListByAdmin)
router.post('/addUser', controller.addUserByAdmin)
router.post('/updateUser', controller.getUserListByAdmin)
router.post('/deleteUser', controller.deleteUserByAdmin)
router.post('/ban', controller.banUserByAdmin)

module.exports = router