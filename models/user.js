/**
 * Created by YOU on 2017/12/14.
 */
const {
  model,
} = require('mongoose')
let user = {
  userName: String,
  password: String,
  mail: String,
  description: String,
  articlesCount: Number,
  follows: Array,
  createTime: Date,
}
module.exports = model('user', user)