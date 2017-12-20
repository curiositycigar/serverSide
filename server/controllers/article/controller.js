/**
 * Created by YOU on 2017/12/20.
 */
const modelDir = require('../../config').mongo.modelDir
const Article = require(modelDir).Article
// 用户API
// 用户添加文章
// 用户删除文章（并删除评论）
// 用户更新
// 用户上传图片
// 所有人获取单篇文章

// 获取文章列表
// 获取文章数量
// 获取上一篇和下一篇
// 获取文章封面图片
// 用户收藏/取消收藏(被收藏数++，文章ID增加给用户)
