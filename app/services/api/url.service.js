/**
 * A helper to find the correct url to connect to socket.io on in all environments
 */

const Vue = require('vue')
const config = require('../../../config/default.js')
const productionConfig = require('../../../config/production.json')

var correctConfig = config
var url
if(typeof window === 'undefined') {
  var isProd = process.env.NODE_ENV === 'production'
  if(isProd) {
    correctConfig = Object.assign(config, productionConfig)
  }

  if(correctConfig.port === 'PORT') {
    correctConfig.port = process.env.PORT
  }

  const port = (correctConfig.port !== 80 || correctConfig.port !== "80")? ":" + correctConfig.port: ''

  url = `${correctConfig.protocal}://${correctConfig.host}${port}`

} else if(NODE_ENV === 'test') {
  url = 'http://localhost:3030'
} else {
  if(typeof window !== undefined) {
    url = window.location.origin
  }
}

exports.url = url
