/**
 * Created by YOU on 2017/12/21.
 */
const modelDir = require('../../config').mongo.modelDir
const Tag = require(modelDir).Tag

// 添加标签
exports.addTag = (ctx, next) => {
  res.response.body = 'tag!'
}
// 删除标签
exports.deleteTag = (ctx, next) => {
  res.response.body = 'tag!'
}
// 修改标签名
exports.updateTag = (ctx, next) => {
  res.response.body = 'tag!'
}