/**
 * Created by YOU on 2017/12/8.
 */
const sendMail = require('../modules/mailSend.js')

let apiLogin = async (ctx, next) => {
  let responseData = ''
  if (ctx.request.body.userName && ctx.request.body.userName === ctx.request.body.password) {
    responseData = `<p>welcome, user ${ctx.request.body.userName}!</p>`
  } else {
    responseData = `<p>Password is not match to you userName!</p>`
  }
  ctx.response.body = responseData
}
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
let apiRegister = async (ctx, next) => {
  
}

module.exports = {
  'POST#/api/login': apiLogin,
  'POST#/api/sendMail': apiSendMail,
}