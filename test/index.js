/**
 * Created by YOU on 2017/12/23.
 */
// https://www.jianshu.com/p/ab418f41cd7a
const host = 'http://127.0.0.1:3000'
const request = require('request')
const assert = require('assert')

describe('用户状态测试!', function () {
  it('测试注册', (done) => {
    request.post(host + '/user/register')
      .form({
        name: 'youwg1',
        password: 'password',
        mail: 'you11098@163.com',
      })
      .on('response', function (res) {
        let data = ''
        assert.equal(res.statusCode, 200)
        done()
      })
  })
})

// it('测试注册', (done) => {
//   request.get(host + '/user/active/youwg')
//     .on('response', function (res) {
//       let data = ''
//       assert.equal(res.statusCode, 200)
//       done()
//     })
// })