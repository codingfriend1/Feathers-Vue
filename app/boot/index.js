const Vue = require('vue')
const store = require('./store-reconciliation')
const router = require('./router')

const prepareSyncList = require('../services/sync-list.service')
require('../services/api.service')
require('../services/notification.service')
require('../services/helpers.service')

require('../components')
require('../views')
const App = require('../views/app.vue')

const filters = require('../filters')

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue(Object.assign({
  router,
  data: { store }
}, App))

prepareSyncList(app.store)
prepareConfirm(app.store)

if(Vue.prototype.$isServer) {
  app.$mount('#app')
} else {
  auth.isLoggedIn()
    .then(res => app.$mount('#app'))
    .catch(err => app.$mount('#app'))
}

module.exports = { app, router, store, syncList }
