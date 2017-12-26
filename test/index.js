/**
 * Created by YOU on 2017/12/23.
 */
// https://www.jianshu.com/p/ab418f41cd7a
const host = 'http://127.0.0.1:3000'
const request = require('request').defaults({jar: true})
const assert = require('assert')
let token = ''
describe('用户状态测试!', function () {
  it('测试注册', (done) => {
    request.post(host + '/user/register')
      .form({
        name: 'youwg',
        password: 'password',
        mail: 'you11098@163.com',
      })
      .on('response', function (res) {
        let data = ''
        assert.equal(res.statusCode, 500)
        res.on('data', function (trunk) {
          data += trunk
        })
        res.on('end', function () {
          console.log(data)
        })
        done()
      })
  })
  it('测试正确用户登录', (done) => {
    request.post(host + '/auth/login')
      .form({
        name: 'youwg',
        password: 'password',
      })
      .on('response', function (res) {
        token = res.headers['set-cookie'][0]
        let data = ''
        assert.equal(res.statusCode, 200)
        res.on('data', function (trunk) {
          data += trunk
        })
        res.on('end', function () {
          console.log(data)
        })
        done()
      })
  })
  it('测试不存在用户登录', (done) => {
    request.cookie(token)
    request.post(host + '/auth/login')
      .form({
        name: 'undefinedYouwg',
        password: 'password1',
      })
      .on('response', function (res) {
        let data = ''
        assert.equal(res.statusCode, 400)
        res.on('data', function (trunk) {
          data += trunk
        })
        res.on('end', function () {
          console.log(data)
        })
        done()
      })
  })
  it('测试获取指定用户信息', (done) => {
    request.get(host + '/user/info/youwg')
      .on('response', function (res) {
        let data = ''
        assert.equal(res.statusCode, 200)
        res.on('data', function (trunk) {
          data += trunk
        })
        res.on('end', function () {
          console.log(data)
        })
        done()
      })
  })
  it('测试获取当前用户信息', (done) => {
    request.get(host + '/user/me')
      .on('response', function (res) {
        let data = ''
        assert.equal(res.statusCode, 200)
        res.on('data', function (trunk) {
          data += trunk
        })
        res.on('end', function () {
          console.log(data)
        })
        done()
      })
  })
})