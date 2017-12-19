/**
 * Created by YOU on 2017/12/8.
 */
const path = require('path')
let dirName = __dirname
module.exports = function () {
  const fs = require('fs')
  const router = require('koa-router')()
  let files = fs.readdirSync(path.join(dirName, '/server/controllers')).filter(f => f.endsWith('.js'))

  for (let f of files) {
    console.log(`Process on controller: ${f}`)
    let mapping = require(path.join(dirName, '/server/controllers/' + f))
    for (let key in mapping) {
      let [method, url] = key.split('#')
      switch (method) {
        case 'POST':
          router.post(url, mapping[key])
          console.log(`Post registered at:${url}`)
          break
        case 'GET':
          router.get(url, mapping[key])
          console.log(`Get registered at:${url}`)
          break
        case 'DELETE':
          router.delete(url, mapping[key])
          console.log(`DELETE registered at:${url}`)
          break
        case 'PUT':
          router.put(url, mapping[key])
          console.log(`PUT registered at:${url}`)
          break
        default:
          console.error(`In file:${path.join(dirName, '/controllers/' + f)}, invalid method got ${key}!`)
      }
    }
  }
  return router.routes()
}