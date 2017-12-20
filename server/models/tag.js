/**
 * Created by YOU on 2017/12/20.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
  tagName: {
    type: String,
    unique: true,
  },
  // 每次删除用户tag时quote--，存入数据库，且若quote-- === 0 删除当前tag
  quote: {
    type: Number,
    default: 0,
  }
})

module.exports = mongoose.model('Tag', TagSchema)