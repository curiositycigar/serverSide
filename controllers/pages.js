/**
 * Created by YOU on 2017/12/8.
 */

let home = async (ctx, next) => {
  ctx.response.body = `<p>${ctx.params.user}</p>`
}
let login = async (ctx, next) => {
  ctx.response.body = `<form method="post" action="/api/login">
    UserName: <input name="userName" type="text">
    Password: <input name="password" type="text">
    <input type="submit" value="提交">
  </form>`
}
let root = async (ctx, next) => {
  ctx.response.body = `
    <a href="/login">login</a>
    <p>Index</p>
  `
}

module.exports = {
  'GET#/home:user': home,
  'GET#/login': login,
  'GET#/': root
}