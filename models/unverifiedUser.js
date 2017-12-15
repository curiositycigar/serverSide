/**
 * Created by YOU on 2017/12/14.
 */
module.exports = (Schema) => {
  console.log('Model unverifiedUser create!')
  return {
    userName: String,
    password: String,
    mail: String,
    createTime: {type: Date, default: Date.now},
  }
}