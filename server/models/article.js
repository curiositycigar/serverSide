/**
 * Created by YOU on 2017/12/14.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ArticleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
  },
  content: String,
  images: {
    type: [String],
    default: [],
  },
  tags: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    }],
    default: [],
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  lovesCount: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Article', ArticleSchema)