/**
 * Created by YOU on 2017/12/14.
 */
const path = require('path')

module.exports = {
  server: {
    host: 'http://192.168.212.61/',
    port: 3000,
  },
  mongo: {
    // uri: 'mongodb://192.168.212.41/serverSide',
    uri: 'mongodb://192.168.158.128/serverSide',
    options: {
      useMongoClient: true,
    },
    modelDir: path.join(__dirname, '../../', 'server/models')
  },
  controller: {
    controllerDir: path.join(__dirname, '../../', 'server/controllers')
  },
  mail: {
    service: 'qq',
    auth: {
      user: '1255828611@qq.com',
      // 授权码
      pass: 'pnirmpcfqwdabagi'
    }
  },
  preUri: ['user'],
  auth: {
    secret: 'secret',
    expiresIn: '1h',
  },
}