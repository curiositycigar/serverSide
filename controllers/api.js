/**
 * Created by YOU on 2017/12/8.
 */

let apiLogin = async (ctx, next) => {
  let responseData = ''
  if (ctx.request.body.userName && ctx.request.body.userName === ctx.request.body.password) {
    responseData = `<p>welcome, user ${ctx.request.body.userName}!</p>`
  } else {
    responseData = `<p>Password is not match to you userName!</p>`
  }
  ctx.response.body = responseData
}

module.exports = {
  'POST#/api/login': apiLogin
}