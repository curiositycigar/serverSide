/**
 * Created by YOU on 2017/12/8.
 */
const sendMail = require('../modules/mailSend.js')
const {
  UnverifiedUser,
  User,
  Article,
} = require('../modules/db')
// 登录
let apiLogin = async (ctx, next) => {
  let responseData = ''
  if (ctx.request.body.userName && ctx.request.body.userName === ctx.request.body.password) {
    responseData = `<p>welcome, user ${ctx.request.body.userName}!</p>`
  } else {
    responseData = `<p>Password is not match to you userName!</p>`
  }
  ctx.response.body = responseData
}
// 邮件
let apiSendMail = async (ctx, next) => {
  let responseData = ''
  if (ctx.request.body.title && ctx.request.body.addresses) {
    await sendMail({
      title: ctx.request.body.title,
      addresses: ctx.request.body.addresses,
    }).then(function (info) {
      responseData = `<p>Mail send Successfully!</p>`
    }).catch(function (err) {
      responseData = `<p>Mail send Failed!</p>`
    })
  } else {
    responseData = `<p>Title and Address is required!</p>`
  }
  ctx.response.body = responseData
}
// 注册
let apiRegister = async (ctx, next) => {
  let params = ctx.request.body
  let responseData = ''
  if (params.userName && params.password && params.mail) {
    let user = new UnverifiedUser({
      userName: params.userName,
      password: params.password,
      mail: params.mail,
    })
    await new Promise(function (resolve, reject) {
      user.save((err) => {
        if (err) {
          reject(err)
        } else {
          resolve('保存成功')
        }
      })
    }).then(function () {
      responseData = `<p>Save Successfully!</p>`
    })
  } else {
    responseData = `<p>Params is miss!</p>`
  }
  await sendMail({
    title: params.userName + ', 请确认您的邮箱地址！',
    addresses: params.mail,
  }).then(function (info) {
    console.log('Mail Send for:', params.userName, params.mail)
  }).catch(function (err) {
    console.log('Mail Send failed:', err)
  })
  ctx.response.body = responseData
}

module.exports = {
  'POST#/api/login': apiLogin,
  'POST#/api/sendMail': apiSendMail,
  'POST#/api/Register': apiRegister,
}