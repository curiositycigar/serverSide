/**
 * Created by YOU on 2017/12/8.
 */
let dirName = __dirname
module.exports = function () {
  const fs = require('fs')
  const router = require('koa-router')()
  let files = fs.readdirSync(dirName + '/controllers').filter(f => f.endsWith('.js'))

  for (let f of files) {
    console.log(`Process on controller: ${f}`)
    let mapping = require(dirName + '/controllers/' + f)
    for (let url in mapping) {
      if (url.startsWith('GET')) {
        let path = url.substring(4)
        router.get(path, mapping[url])
        console.log(`Get registered at:${path}`)
      } else if (url.startsWith('POST')) {
        let path = url.substring(5)
        router.post(path, mapping[url])
        console.log(`Post registered at:${path}`)
      } else {
        console.log(`In file:${dirName + '/controllers/' + f}, invalid method got!`)
      }
    }
  }
  return router.routes()
}