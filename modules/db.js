/**
 * Created by YOU on 2017/12/14.
 */
const db = require('../config').db
module.exports = async function () {
  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise
  return connection = await mongoose.connect(db, {
    useMongoClient: true,
  }).then(function (info) {
    console.log('Connect Successfully!')
  }).catch(function (e) {
    console.log('Error:', e)
  })
}