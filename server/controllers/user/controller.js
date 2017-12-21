/**
 * Created by YOU on 2017/12/20.
 */
const modelDir = require('../../config').mongo.modelDir
const User = require(modelDir).User
const randomCode = require('../../utils').randomCode

// 获取用户摘要(userName)
exports.getUserInfo = async (ctx, next) => {
  let user = new User({
    name: ctx.params.name,
    password: 'password',
    activeCode: randomCode(50),
    mail: 'you11098@163.com',
  })
  await user.save()
  ctx.response.body = ctx.params.name + 'Hellow'
}

// 注册
exports.register = async (ctx, next) => {
  // 注册成功，发送验证邮件
  ctx.response.body = 'welcome'
}
// 验证邮箱
exports.activeMail = async (ctx, next) => {
  const user = await User.findOne({name: ctx.params.code})
  console.log(user)
  ctx.response.body = user
}
// 登录(设置token)
exports.login = async (ctx, next) => {
  ctx.response.body = 'welcome'
}
// 获取个人详细信息(token)
exports.getUserInfoBySelf = async (ctx, next) => {
  ctx.response.body = 'welcome'
}
// 更新用户信息
exports.updateUserBySelf = async (ctx, next) => {
  ctx.response.body = 'welcome'
}
// 修改密码
exports.changePasswordBySelf = async (ctx, next) => {
  ctx.response.body = 'welcome'
}

// 后台获取用户列表（仅非管理员用户）
exports.getUserListByAdmin = async (ctx, next) => {
  ctx.response.body = 'welcome'
}
// 添加用户
exports.addUserByAdmin = async (ctx, next) => {
  ctx.response.body = 'welcome'
}
// 更新用户信息
exports.changePasswordByAdmin = async (ctx, next) => {
  ctx.response.body = 'welcome'
}
// 删除用户
exports.deleteUserByAdmin = async (ctx, next) => {
  ctx.response.body = 'welcome'
}
// 封禁账号
exports.banUserByAdmin = async (ctx, next) => {
  ctx.response.body = 'welcome'
}