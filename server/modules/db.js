/**
 * Created by YOU on 2017/12/14.
 */
const db = require('../config/index').db
const mongoose = require('mongoose')
const modelsCreater = require('../models/index')
mongoose.Promise = global.Promise
let connection = mongoose.connect(db, {
  useMongoClient: true,
}).then(function (info) {
  console.log('Connect Successfully!')
}).catch(function (e) {
  console.log('Error:', e)
})

module.exports = connection