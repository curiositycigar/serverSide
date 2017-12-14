/**
 * Created by YOU on 2017/12/14.
 */
const {
  Schema,
  model,
} = require('mongoose')
let article = {
  title: String,
  content: String,
  author: Schema.Types.ObjectId,
  createTime: Date,
}
module.exports = model('article', article)