/**
 * Created by YOU on 2017/12/14.
 */
module.exports = (Schema) => {
  console.log('Model user create!')
  return {
    userName: String,
    password: String,
    mail: String,
    description: String,
    articlesCount: Number,
    follows: Array,
    createTime: Date,
    lastLoginTime: Date,
  }
}