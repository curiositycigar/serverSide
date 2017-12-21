/**
 * Created by YOU on 2017/12/12.
 */
// 邮件发送测试
const mailConfig = require('../config').mail
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: mailConfig.service,
  auth: mailConfig.auth,
})
// let mailOptions = {
//   from: '1255828611@qq.com',
//   to: 'you11098@163.com',
//   subject: 'nodemailer邮件发送测试',
//   html: `<h2>这是一个测试邮件，收到请忽略！</h2>`
// }

module.exports = function (obj) {
  return new Promise(function (resolve, reject) {
    let addresses = obj.addresses
    let title = obj.title
    let html = obj.html
    transporter.sendMail({
      from: mailConfig.auth.user,
      to: addresses || '',
      subject: title || '',
      html: html || `<h2>这是一个测试邮件，收到请忽略！</h2>`
    }, function (err, info) {
      if (err) {
        reject(err)
        return console.log(err)
      }
      resolve(info)
      console.log('发送成功: ', info)
    })
  })
}