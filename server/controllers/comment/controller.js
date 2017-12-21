/**
 * Created by YOU on 2017/12/20.
 */

const modelDir = require('../../config').mongo.modelDir
const Comment = require(modelDir).Comment

// 添加评论 文章id
exports.addComment = async (ctx, next) => {
  console.log('comment!')
}
// 删除评论 [评论id]
exports.deleteComment = async (ctx, next) => {
  console.log('comment!')
}
// 获取评论列表 文章id
exports.getCommentList = async (ctx, next) => {
  console.log('comment!')
}