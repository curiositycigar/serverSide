/**
 * Created by YOU on 2017/12/15.
 */
module.exports = (Schema) => {
  return {
    UnverifiedUser: require('./unverifiedUser')(Schema),
    User: require('./user')(Schema),
    Article: require('./article')(Schema),
  }
}