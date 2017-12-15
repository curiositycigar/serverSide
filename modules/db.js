/**
 * Created by YOU on 2017/12/14.
 */
const db = require('../config').db
const mongoose = require('mongoose')
const modelsCreater = require('../models')
mongoose.Promise = global.Promise
let connection = mongoose.connect(db, {
  useMongoClient: true,
}).then(function (info) {
  console.log('Connect Successfully!')
}).catch(function (e) {
  console.log('Error:', e)
})
let models = modelsCreater(mongoose.Schema)
let modelList = {}
for (let key in models) {
  modelList[key] = mongoose.model(key, models[key])
}

module.exports = modelList