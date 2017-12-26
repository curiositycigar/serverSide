/**
 * Created by YOU on 2017/12/20.
 */
const config = require('../../config');
const modelDir = config.mongo.modelDir;
const host = config.server.host;
const User = require(modelDir).User;
const {
  randomCode,
  sendMail,
  encryptPassword,
} = require('../../utils');

// 获取用户摘要(userName)
exports.getUserInfo = async (ctx, next) => {
  console.log(ctx.params.name);
  let user = null;
  try {
    user = await User.findOne({name: ctx.params.name})
  } catch (e) {
    ctx.throw(e)
  }
  if (user) {
    return ctx.response.body = ctx.success(user.userInfo)
  } else {
    return ctx.throw('用户不存在')
  }
};
// 验证用户名
exports.isUserNameExist = async (ctx, next) => {
  let user = null;
  try {
    user = await User.findOne({name: ctx.params.name})
  } catch (e) {
    ctx.throw(e)
  }
  ctx.response.body = ctx.success(!!user)
};
// 验证邮箱地址
exports.isMailExist = async (ctx, next) => {
  let user = null;
  try {
    user = await User.findOne({mail: ctx.params.mail})
  } catch (e) {
    ctx.throw(e)
  }
  ctx.response.body = ctx.success(!!user)
};
// 注册
exports.register = async (ctx, next) => {
  let userData = {
    name: ctx.request.body.name,
    password: ctx.request.body.password,
    activeCode: ctx.request.body.name + randomCode(50).replace(/[\/\\?&#=]/g, ''),
    mail: ctx.request.body.mail,
  };
  let user = new User(userData);
  try {
    await user.save()
  } catch (e) {
    ctx.throw(e)
  }
  // 注册成功，发送验证邮件
  // try {
  //   await sendMail({
  //     addresses: userData.mail,
  //     title: '您的邮箱确认邮件',
  //     html: `
  //       请点击<a href="${host}active/${userData.activeCode}">这里</a>确认您的邮箱地址，如果这封邮件不是您发送的，请忽略！
  //     `,
  //   })
  // } catch (e) {
  //   ctx.throw(e)
  // }
  ctx.response.body = ctx.success('注册成功')
};
// 验证邮箱
exports.activeMail = async (ctx, next) => {
  try {
    await User.findOne({code: ctx.body.code})
  } catch (e) {
    ctx.throw(e)
  }
};
// 获取个人详细信息(token)
exports.getUserInfoBySelf = async (ctx, next) => {
  ctx.response.body = ctx.state.user
};
// 更新用户信息
exports.updateUserBySelf = async (ctx, next) => {
  const userData = {
    mailShow: ctx.response.body.mailShow,
    loveArticlesShow: ctx.response.body.loveArticlesShow,
    followsShow: ctx.response.body.followsShow,
    fansShow: ctx.response.body.fansShow,
    description: ctx.response.body.description,
  };
  ctx.response.body = 'welcome'
};
// 关注
exports.doFollow = async (ctx, next) => {
  // ctx.state.user.follows
  ctx.response.body = 'welcome'
};
// 取消关注
exports.undoFollow = async (ctx, next) => {
  ctx.response.body = 'welcome'
};
// 收藏
exports.doCollection = async (ctx, next) => {
  ctx.response.body = 'welcome'
};
// 取消收藏
exports.undoCollection = async (ctx, next) => {
  ctx.response.body = 'welcome'
};
// 修改密码
exports.changePasswordBySelf = async (ctx, next) => {
  if (encryptPassword(ctx.request.body.oldPassword, ctx.state.user.salt) === ctx.state.user.hashedPassword) {
    // 旧密码验证通过
  } else {
    ctx.response.body = ctx.failure('原始密码错误')
  }
};

// 后台获取用户列表（仅非管理员用户）
exports.getUserInfoByAdmin = async (ctx, next) => {
  ctx.response.body = 'welcome'
};
exports.getUserListByAdmin = async (ctx, next) => {
  ctx.response.body = 'welcome'
};
// 添加用户
exports.addUserByAdmin = async (ctx, next) => {
  ctx.response.body = 'welcome'
};
// 更新用户信息
exports.changePasswordByAdmin = async (ctx, next) => {
  ctx.response.body = '接口不可用'
};
// 删除用户
exports.deleteUserByAdmin = async (ctx, next) => {
  ctx.response.body = 'welcome'
};
// 封禁账号
exports.banUserByAdmin = async (ctx, next) => {
  ctx.response.body = 'welcome'
};