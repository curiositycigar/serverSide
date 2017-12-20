/**
 * Created by YOU on 2017/12/20.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  articleID: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: String,
  createTime: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Comment', CommentSchema)