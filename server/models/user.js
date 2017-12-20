/**
 * Created by YOU on 2017/12/14.
 */
const avatar = 'url'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: avatar
  },
  // 用户级别
  level: {
    type: Number,
    default: 0,
  },
  // 是否激活
  active: {
    type: Boolean,
    default: false,
  },
  mail: {
    type: String,
    lowercase: true,
    unique: true,
  },
  description: {
    type: String,
  },
  articles: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }],
    default: [],
  },
  loveArticles: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }],
    default: [],
  },
  follows: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    default: [],
  },
  fans: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    default: [],
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  lastLoginTime: {
    type: Date,
    default: Date.now,
  },
  // 登录次数记录
  loginCount: {
    type: Number,
    default: 0,
  },
  // 是否被禁用
  alive: {
    type: Boolean,
    default: true,
  },
  // 超能力等级
  power: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('User', UserSchema)
