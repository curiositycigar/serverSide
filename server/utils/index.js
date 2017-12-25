/**
 * Created by YOU on 2017/12/21.
 */

const crypto = require('crypto')
exports.randomCode = (length) => {
  return crypto.randomBytes(length || 100).toString('base64')
}
exports.sendMail = require('./mailSend')

exports.encryptPassword = function (password, salt) {
  if (!password || !salt) return ''
  let bufferSalt = new Buffer(salt, 'base64')
  return crypto.pbkdf2Sync(password, bufferSalt, 10000, 64, 'sha1').toString('base64')
}