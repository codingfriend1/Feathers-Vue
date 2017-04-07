/**
 * A helper to find the correct url to connect to socket.io on in all environments
 */

const Vue = require('vue')
const config = require('../../config/default.json')
const productionConfig = require('../../config/production.json')

var correctConfig = config
var url
if(Vue.prototype.$isServer) {
  var isProd = process.env.NODE_ENV === 'production'
  if(isProd) {
    correctConfig = Object.assign(config, productionConfig)
  }

  if(correctConfig.port === 'PORT') {
    correctConfig.port = process.env.PORT
  }

  const port = (correctConfig.port !== 80 || correctConfig.port !== "80")? ":" + correctConfig.port: ''

  url = `${correctConfig.protocal}://${correctConfig.host}${port}/api/`

} else {
  if(typeof window !== undefined) {
    url = window.location.origin + '/api/'
  }
}

exports.url = url
