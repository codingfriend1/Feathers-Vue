const Vue = require("vue")
require('./vendor.scss')
window._ = require('lodash')

// Import Framework 7 and material theme
require('framework7')
require('framework7/dist/css/framework7.material.min.css')
require('framework7/dist/css/framework7.material.colors.min.css')
Vue.use(require('framework7-vue'))

Vue.use(require('vue-moment'))
Vue.use(require('vue-stash').default)