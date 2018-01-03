/**
 * Created by YOU on 2017/12/14.
 */
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  encryptPassword,
} = require('../utils');
const nameValidate = {
  reg: /^[a-zA-Z][0-9a-zA-Z_]{4,14}$/,
  message: '字母开头字母数字下划线组合5-14位',
};
const mailValidate = {
  reg: /^[a-zA-Z0-9_]{3,20}@[a-zA-Z0-9]{1,10}\.[a-z]{1,8}$/,
  message: '邮箱地址不合法或不支持',
};
const avatar = 'url';
let UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  hashedPassword: {
    type: String,
  },
  salt: String,
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
  mailShow: {
    type: Boolean,
    default: true,
  },
  mail: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    default: '',
  },
  // 收藏
  loveArticlesShow: {
    type: Boolean,
    default: true,
  },
  loveArticles: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }],
    default: [],
  },
  // 关注
  followsShow: {
    type: Boolean,
    default: true,
  },
  follows: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    default: [],
  },
  fansCount: {
    type: Number,
    default: 0,
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
  power: {
    type: Number,
    default: 0,
  },
});

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = encryptPassword(password, this.salt)
  })
  .get(function () {
    return this._password
  });

UserSchema
  .virtual('userInfo')
  .get(function () {
    let loveArticles = this.loveArticles;
    let follows = this.follows;
    let fans = this.fans;
    let userInfo = {
      name: this.name,
      avatar: this.avatar,
      level: this.level,
      description: this.description,
      power: this.power,
      mailShow: this.mailShow,
      loveArticlesShow: this.loveArticlesShow,
      followsShow: this.followsShow,
      fansShow: this.fansShow,
    };
    if (this.mailShow) {
      userInfo.mail = this.mail
    }
    if (this.loveArticlesShow) {
      userInfo.loveArticles = this.loveArticles
    }
    if (this.followsShow) {
      userInfo.follows = this.follows
    }
    if (this.fansShow) {
      userInfo.fans = this.fans
    }
    return userInfo
  });

UserSchema
  .path('name')
  .validate({
    async validator(value) {
      return nameValidate.reg.test(value)
    },
    message: nameValidate.message,
  }, {
    async validator(value) {
      let user = await this.constructor.findOne({name: value});
      return !user
    },
    message: '用户名已存在',
  });
UserSchema
  .path('mail')
  .validate({
    async validator(value) {
      return mailValidate.reg.test(value)
    },
    message: mailValidate.message,
  }, {
    async validator(value) {
      let mail = await this.constructor.findOne({mail: value});
      return !mail
    },
    message: '邮箱已注册账号!',
  });

UserSchema.methods = {
  // 生成盐
  makeSalt() {
    return crypto.randomBytes(16).toString('base64')
  }
};

module.exports = mongoose.model('User', UserSchema);
