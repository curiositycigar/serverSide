/**
 * Created by YOU on 2017/12/14.
 */
const path = require('path')
const mongoConfig = require('./config/index').mongo
const mongoose = require('mongoose')
const fs = require('fs')
mongoose.Promise = global.Promise
mongoose.connect(mongoConfig.uri, mongoConfig.options)

const files = fs.readdirSync(mongoConfig.modelDir).filter(f => f.endsWith('.js'))

for (let file of files) {
  console.log(path.join(mongoConfig.modelDir, file))
  require(path.join(mongoConfig.modelDir, file))
}

module.exports = mongoose