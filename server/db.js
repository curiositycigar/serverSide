/**
 * Created by YOU on 2017/12/14.
 */
const path = require('path')
const mongoConfig = require('./config/index').mongo
const mongoose = require('mongoose')
const fs = require('fs')
mongoose.Promise = global.Promise
const connection = mongoose.connect(mongoConfig.uri, mongoConfig.options)
connection.on('error', function (err) {
  console.error(err)
})
const files = fs.readdirSync(mongoConfig.modelDir).filter(f => f.endsWith('.js'))

for (let file of files) {
  console.log(path.join(mongoConfig.modelDir, file))
  require(path.join(mongoConfig.modelDir, file))
}

module.exports = mongoose