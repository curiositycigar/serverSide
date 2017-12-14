/**
 * Created by YOU on 2017/12/14.
 */
const {
  model,
} = require('mongoose')
let unverifiedUser = {
  userName: String,
  password: String,
  mail: String,
  createTime: Date,
}
module.exports = model('unverifiedUser', unverifiedUser)