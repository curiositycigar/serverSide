/**
 * Created by YOU on 2017/12/14.
 */
const path = require('path')

module.exports = {
  mongo: {
    uri: 'mongodb://192.168.212.41/serverSide',
    options: {
      useMongoClient: true,
    },
    modelDir: path.join(__dirname, '../../', 'server/models')
  },
  preUri: ['static', 'api', 'register', 'login', 'mail']
}