/**
 * Created by YOU on 2017/12/20.
 */
const modelDir = require('../../config').mongo.modelDir;
const Article = require(modelDir).Article;
const Comment = require(modelDir).Comment;
// 用户API
// 用户添加文章
exports.addArticle = async (ctx, next) => {
  let articleData = {
    author: ctx.state.user._id,
    title: ctx.request.body.title,
    content: ctx.request.body.content,
    tags: ctx.request.body.tags
  };
  if (ctx.request.body.id) {
    articleData._id = ctx.request.body.id
  }
  let article = new Article(articleData);
  try {
    await article.save()
  } catch (e) {
    ctx.throw(e)
  }
  ctx.response.body = ctx.success('保存成功')
};
// 用户删除文章（并删除评论）
exports.deleteArticle = async (ctx, next) => {
  let id = ctx.request.body.id;
  try {
    await Article.remove({_id: id});
    await Comment.remove({articleID: id})
  } catch (e) {
    ctx.throw(e)
  }
  ctx.response.body = ctx.success('删除成功')
};
// 用户上传图片
exports.uploadImg = async (ctx, next) => {
  console.log('welcome article!')
};


// 所有人获取单篇文章
exports.getArticle = async (ctx, next) => {
  let id = ctx.params.id;
  let ArticleData;
  try {
    ArticleData = Article.find({_id: id})
  } catch (e) {
    ctx.throw(e)
  }
  ctx.response.body = ctx.success(ArticleData);
  console.log('welcome article!')
};
// 获取文章列表 tag、page、pageSize
exports.getArticleList = async (ctx, next) => {
  let ArticleList = [];
  let tag = ctx.request.body.tag;
  let page = ctx.request.body.page;
  let pageSize = ctx.request.body.pageSize;
  let query = {};
  if (!page || !pageSize) {
    ctx.throw(400, '参数不合法')
  }
  let skip = ((page - 1) * pageSize);
  if (tag) {
    query = {tags: tag}
  }
  try {
    ArticleList = await Article.find(tag).skip(skip).limit(pageSize)
  } catch (e) {
    ctx.throw(e)
  }
  ctx.response.body = ctx.success(ArticleList)
};
// 获取文章数量(根据标签或获取全部数量)
exports.getArticleCount = async (ctx, next) => {
  let count = 0;
  try {
    count = await Article.count()
  } catch (e) {
    ctx.throw(e)
  }
  ctx.response.body = ctx.success(count)
};
// 获取上一篇和下一篇
exports.getPreAndNextArticle = async (ctx, next) => {
  let tag = ctx.params.tag;
  let id = ctx.params.id;
  console.log('welcome article!')
};
// 获取文章简要信息及封面图片
exports.getArticleAbstract = async (ctx, next) => {
  console.log('welcome article!')
};
