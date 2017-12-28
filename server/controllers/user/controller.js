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
    return ctx.throw(e)
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
    return ctx.throw(e)
  }
  ctx.response.body = ctx.success(!!user)
};
// 验证邮箱地址
exports.isMailExist = async (ctx, next) => {
  let user = null;
  try {
    user = await User.findOne({mail: ctx.params.mail})
  } catch (e) {
    return ctx.throw(e)
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
    return ctx.throw(e)
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
    return ctx.throw(e)
  }
};
// 获取个人详细信息(token)
exports.getUserInfoBySelf = async (ctx, next) => {
  ctx.response.body = ctx.state.user
};
// 更新用户信息
exports.updateUserBySelf = async (ctx, next) => {
  let result = null;
  let userData = {};
  ctx.request.body.mailShow !== undefined ? userData.mailShow = ctx.request.body.mailShow : '';
  ctx.request.body.loveArticlesShow !== undefined ? userData.loveArticlesShow = ctx.request.body.loveArticlesShow : '';
  ctx.request.body.followsShow !== undefined ? userData.followsShow = ctx.request.body.followsShow : '';
  ctx.request.body.fansShow !== undefined ? userData.fansShow = ctx.request.body.fansShow : '';
  ctx.request.body.description !== undefined ? userData.description = ctx.request.body.description : '';
  console.log(userData);
  if (Object.keys(userData).length <= 0) {
    return ctx.throw(400, '请提交正确数据')
  } else {
    try {
      result = await User.update({_id: ctx.state.user._id}, {$set: userData})
    } catch (e) {
      return ctx.throw(e)
    }
    console.log(result);
    ctx.response.body = ctx.success(result)
  }
};
// 关注（批量操作需涉及事务）
exports.doFollow = async (ctx, next) => {
  let id = ctx.params.id;
  let follows = ctx.state.user.follows;
  let result = null;
  if (follows.indexOf(id) === -1) {
    follows.push(id);
    try {
      result = await User.update({_id: ctx.state.user._id}, {$set: {follows}})
    } catch (e) {
      ctx.throw(e)
    }
    ctx.response.body = ctx.success(result)
  } else {
    return ctx.throw(400, '已关注')
  }
};
// 取消关注(同关注)
exports.undoFollow = async (ctx, next) => {
  let id = ctx.params.id;
  let follows = ctx.state.user.follows;
  let result = null;
  let index = follows.indexOf(id);
  if (index !== -1) {
    follows = follows.splice(index, 0);
    try {
      result = await User.update({_id: ctx.state.user._id}, {$set: {follows}})
    } catch (e) {
      ctx.throw(e)
    }
    ctx.response.body = ctx.success(result)
  } else {
    return ctx.throw(400, '未关注此人')
  }
};
// 收藏(可批量操作)
exports.doCollection = async (ctx, next) => {
  let id = ctx.params.id;
  let loveArticles = ctx.state.user.loveArticles;
  let result = null;
  if (loveArticles.indexOf(id) === -1) {
    loveArticles.push(id);
    try {
      result = await User.update({_id: ctx.state.user._id}, {$set: {loveArticles}})
    } catch (e) {
      ctx.throw(e)
    }
    ctx.response.body = ctx.success(result)
  } else {
    return ctx.throw(400, '已收藏')
  }
};
// 取消收藏
exports.undoCollection = async (ctx, next) => {
  let id = ctx.params.id;
  let loveArticles = ctx.state.user.loveArticles;
  let result = null;
  let index = loveArticles.indexOf(id);
  if (index !== -1) {
    loveArticles = loveArticles.splice(index, 0);
    try {
      result = await User.update({_id: ctx.state.user._id}, {$set: {loveArticles}})
    } catch (e) {
      ctx.throw(e)
    }
    ctx.response.body = ctx.success(result)
  } else {
    return ctx.throw(400, '未收藏此文章')
  }
};
// 修改密码
exports.changePasswordBySelf = async (ctx, next) => {
  let result = null;
  if (encryptPassword(ctx.request.body.oldPassword, ctx.state.user.salt) === ctx.state.user.hashedPassword) {
    // 旧密码验证通过
    try {
      result = await User.update({_id: ctx.state.user._id}, {$set: {password: ctx.state.user.password}})
    } catch (e) {
      ctx.throw(e)
    }
  } else {
    ctx.response.body = ctx.failure('原始密码错误')
  }
};

// 后台获取用户列表（管理员用户）//page\pageSize
exports.getUserInfoByAdmin = async (ctx, next) => {
  let skip = ((page - 1) * pageSize);
  let count = await User.count();
  console.log('count:', count)
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
