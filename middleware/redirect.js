/**
 * Created by YOU on 2017/12/15.
 */
// 默认排除preList中URI
module.exports = function (preList, targetPath, use) {
  return async (ctx, next) => {
    targetPath = targetPath || '/'
    let rPath = ctx.request.path.replace(/^\//, '')
    if (rPath === '') {
      return await next()
    }
    if (use) {
      // 排除
      for (let pre of preList) {
        if (rPath.startsWith(pre)) {
          return ctx.redirect(targetPath)
        }
      }
      return await next()
    } else {
      // 选中
      for (let pre of preList) {
        if (rPath.startsWith(pre)) {
          return await next()
        }
      }
      return ctx.redirect(targetPath)
    }
  }
}