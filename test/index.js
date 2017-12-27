/**
 * Created by YOU on 2017/12/23.
 */
// https://www.jianshu.com/p/ab418f41cd7a
const host = 'http://127.0.0.1:3000';
const request = require('request').defaults({jar: true});
const assert = require('assert');

const register = (done) => {
  request.post(host + '/user/register')
    .form({
      name: 'youwg',
      password: 'password',
      mail: 'you11098@163.com',
    })
    .on('response', (res) => {
      let data = '';
      assert.equal(res.statusCode, 500);
      res.on('data', function (trunk) {
        data += trunk
      });
      res.on('end', function () {
        console.log(data);
        done()
      })
    })
};

const login = function (name, password) {
  return (done) => {
    request.post(host + '/auth/login')
      .form({
        name: name,
        password: password,
      })
      .on('response', function (res) {
        let data = '';
        assert.equal(res.statusCode, 200);
        res.on('data', function (trunk) {
          data += trunk
        });
        res.on('end', function () {
          console.log(data);
          done()
        })
      })
  }
};

const getUserInfo = function (name) {
  return (done) => {
    request.get(host + '/user/info/' + name)
      .on('response', function (res) {
        let data = '';
        assert.equal(res.statusCode, 200);
        res.on('data', function (trunk) {
          data += trunk
        });
        res.on('end', function () {
          console.log(data)
        });
        done()
      })
  }
};

const selfInfo = (done) => {
  request.get(host + '/user/me')
    .on('response', function (res) {
      let data = '';
      assert.equal(res.statusCode, 200);
      res.on('data', function (trunk) {
        data += trunk
      });
      res.on('end', function () {
        console.log(data);
        done()
      })
    })
};

const update = function (data) {
  return (done) => {
    request.post(host + '/user/update')
      .form(data)
      .on('response', function (res) {
        let data = '';
        assert.equal(res.statusCode, 200);
        res.on('data', function (trunk) {
          data += trunk
        });
        res.on('end', function () {
          console.log(data);
          done()
        })
      })
  }
};
const doFollow = function (data) {
  return (done) => {
    request.post(host + '/user/doFollow')
      .form(data)
      .on('response', function (res) {
        let data = '';
        assert.equal(res.statusCode, 200);
        res.on('data', function (trunk) {
          data += trunk
        });
        res.on('end', function () {
          console.log(data);
          done()
        })
      })
  }
};

describe('用户状态测试!', function () {
  // it('测试注册已注册', register)
  it('测试正确用户登录', login('youwg', 'password'));
  // it('测试不存在用户登录', login('youwg123', 'password1'))`
  // it('测试获取指定用户信息', getUserInfo('youwg'))
  it('测试获取当前用户信息', selfInfo)
  // it('测试更新用户信息', update({}))
  // it('测试关注用户', doFollow({data: ['youwg', 'asdsad']}))
});