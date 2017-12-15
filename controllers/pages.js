/**
 * Created by YOU on 2017/12/8.
 */

let home = async (ctx, next) => {
  ctx.response.body = `<p>${ctx.params.user}</p>`
}
let login = async (ctx, next) => {
  ctx.response.body = `
<link rel="stylesheet" href="/static/css/style.css">
<form method="post" action="/api/login">
    UserName: <input name="userName" type="text"><br/><br/>
    Password: <input name="password" type="text"><br/><br/>
    <input type="submit" value="提交">
  </form>`
}
let mail = async (ctx, next) => {
  ctx.response.body = `
<link rel="stylesheet" href="/static/css/style.css">
<form method="post" action="/api/sendMail">
    <label for="addresses">addresses:</label> <input id="addresses" name="addresses" type="text"><br/><br/>
   <label for="title">title:</label> <input id="title" name="title" type="text"><br/><br/>
    <input type="submit" value="提交">
  </form>`
}
let register = async (ctx, next) => {
  ctx.response.body = `
<link rel="stylesheet" href="/static/css/style.css">
<form method="post" action="/api/Register">
    <label for="userName">userName:</label> <input id="userName" name="userName" type="text"><br/><br/>
    <label for="password">password:</label> <input id="password" name="password" type="text"><br/><br/>
    <label for="mail">mail:</label> <input id="mail" name="mail" type="text"><br/><br/>
    <input type="submit" value="提交">
  </form>`
}
let root = async (ctx, next) => {
  ctx.response.body = `
    <a href="/login">login</a>
    <a href="/mail">mail</a>
    <a href="/register">register</a>
    <p>Index</p>
  `
}

module.exports = {
  'GET#/home:user': home,
  'GET#/login': login,
  'GET#/mail': mail,
  'GET#/register': register,
  'GET#/': root,
}