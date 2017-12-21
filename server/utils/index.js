/**
 * Created by YOU on 2017/12/21.
 */

const crypto = require('crypto')
exports.randomCode = (length) => {
  return crypto.randomBytes(length || 100).toString('base64')
}
exports.sendMail = require('./mailSend')