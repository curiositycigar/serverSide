/**
 * Created by YOU on 2017/12/20.
 */
const modelDir = require('../../config').mongo.modelDir
const Article = require(modelDir).Article
// 用户API
// 用户添加文章
exports.addArticle = async (ctx, next) => {
  console.log('welcome article!')
}
// 用户删除文章（并删除评论）
exports.deleteArticle = async (ctx, next) => {
  console.log('welcome article!')
}
// 用户更新文章
exports.updateArticle = async (ctx, next) => {
  console.log('welcome article!')
}
// 用户上传图片
exports.uploadImg = async (ctx, next) => {
  console.log('welcome article!')
}
// 所有人获取单篇文章
exports.article = async (ctx, next) => {
  console.log('welcome article!')
}

// 获取文章列表
exports.articleList = async (ctx, next) => {
  console.log('welcome article!')
}
// 获取文章数量
exports.articleCount = async (ctx, next) => {
  console.log('welcome article!')
}
// 获取上一篇和下一篇
exports.articlePreAndNext = async (ctx, next) => {
  console.log('welcome article!')
}
// 获取文章简要信息及封面图片
exports.articleAbstract = async (ctx, next) => {
  console.log('welcome article!')
}
// 用户收藏/取消收藏(被收藏数++，文章ID增加给用户)
exports.articleDoLove = async (ctx, next) => {
  console.log('welcome article!')
}
