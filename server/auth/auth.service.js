/**
 * Created by YOU on 2017/12/26.
 */
const jwt = require('jsonwebtoken');
const {
  secret,
  expiresIn,
} = require('../config').auth;

exports.authenticated = function (power) {
  return async (ctx, next) => {
    let token = ctx.cookies.get('token');
    if (token && jwt.verify(token, 'secret')) {
      // token校验通过
      ctx.state.user = jwt.decode(token).data;
      if (power !== undefined) {
        if (power === ctx.state.user.power) {
          await next()
        } else {
          ctx.throw(403)
        }
      }
      return await
        next()
    } else {
      //  没有权限
      ctx.throw(403)
    }
  }
};

exports.setToken = async (ctx, next) => {
  let token = jwt.sign(
    {data: ctx.state.user},
    secret,
    {
      expiresIn: expiresIn,
    },
  );
  ctx.cookies.set('token', token);
  ctx.response.body = ctx.success(ctx.state.user)
};
