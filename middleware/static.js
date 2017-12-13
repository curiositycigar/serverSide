/**
 * Created by YOU on 2017/12/11.
 */
const path = require('path')
const fs = require('fs')
const mime = require('mime')

function staticFiles(url, dir) {
  return async (ctx, next) => {
    let rPath = ctx.request.path
    if (rPath.startsWith(url)) {
      let fp = path.join(dir, rPath.substring(url.length))
      console.log('staticPath: ', fp)
      try {
        ctx.response.type = mime.getType(fp)
        ctx.response.body = fs.readFileSync(fp)
      } catch (e) {
        ctx.response.status = 404
      }
    } else {
      await next()
    }
  }
}

module.exports = staticFiles