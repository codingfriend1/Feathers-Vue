import Vue from 'vue'
import config from '../../config/default.json'
import productionConfig from '../../config/production.json'

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

export { url }
