/**
 * Created by YOU on 2017/12/20.
 */
const config = require('../../config')
const modelDir = config.mongo.modelDir
const host = config.server.host
const User = require(modelDir).User
const randomCode = require('../../utils').randomCode
const sendMail = require('../../utils').sendMail

// 获取用户摘要(userName)
exports.getUserInfo = async (ctx, next) => {
  let user = await User.findOne({name: ctx.params.name})
  if (user) {
    ctx.response.body = ctx.success(user)
  } else {
    ctx.throw('用户不存在')
  }
}
// 验证用户名
exports.isUserNameExist = async (ctx, next) => {
  ctx.response.body = ''
}
// 验证邮箱地址
exports.isMailExist = async (ctx, next) => {
  ctx.response.body = ''
}
// 注册
exports.register = async (ctx, next) => {
  let userData = {
    name: ctx.request.body.name,
    password: ctx.request.body.password,
    activeCode: randomCode(50),
    mail: ctx.request.body.mail,
  }
  let user = new User(userData)
  try {
    await user.save()
  } catch (e) {
    ctx.throw(e)
  }
  try {
    await sendMail({
      addresses: userData.mail,
      title: '您的邮箱确认邮件',
      html: `
        请点击<a href="${host}active/${userData.activeCode}">这里</a>确认您的邮箱地址，如果这封邮件不是您发送的，请忽略！
      `,
    })
  } catch (e) {
    ctx.throw(e)
  }
  // 注册成功，发送验证邮件
  ctx.response.body = ctx.success('注册成功')
}
// 验证邮箱
exports.activeMail = async (ctx, next) => {
  try {
    await User.findOne({code: ctx.body.code})
  } catch (e) {
    ctx.throw(e)
  }
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