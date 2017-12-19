/**
 * Created by YOU on 2017/12/14.
 */
module.exports = (Schema) => {
  console.log('Model user create!')
  return {
    userName: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
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
    articlesCount: {
      type: Number,
    },
    follows: {
      type: Number,
    },
    createTime: {
      type: Date,
    },
    lastLoginTime: {
      type: Date,
    },
  }
}