/**
 * Created by YOU on 2017/12/14.
 */
const crypto = require('crypto')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const avatar = 'url'
let UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  hashedPassword: {
    type: String,
  },
  avatar: {
    type: String,
    default: avatar,
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
  activeCode: {
    type: String,
  },
  mail: {
    type: String,
    lowercase: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
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
  // 是否可用
  alive: {
    type: Boolean,
    default: true,
  },
  // 超能力等级
  // 等级高的可以管理等级低的
  power: {
    type: Number,
    default: 0,
  },
})

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
  })

UserSchema
  .path('name')
  .validate({
    async validator(value) {
      let user = await this.constructor.findOne({name: value})
    },
    message: 'name validate Failed!'
  })

UserSchema.methods = {
  compareRole(power, compare) {
    let selfPower = this.power
    switch (compare) {
      case '>':
        return this.power > power
      case '<':
        return this.power < power
      case '>=':
        return this.power >= power
      case '<=':
        return this.power <= power
      default:
        return this.power === power
    }
  },
  // 生成盐
  makeSalt() {
    return crypto.randomBytes(16).toString('base64')
  },
  //生成密码
  encryptPassword: function (password) {
    if (!password || !this.salt) return ''
    var salt = new Buffer(this.salt, 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64')
  }
}

module.exports = mongoose.model('User', UserSchema)
