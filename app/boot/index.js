const Vue = require('vue')
const store = require('./store-reconciliation')
const router = require('./router')

require('../components')
require('../views')
require('../filters')

require('../services/api.service')
require('../services/notification.service')
const { prepareConfirm } = require('../services/helpers.service')
const prepareSyncList = require('../services/sync-list.service')

const App = require('../views/app.vue')

const app = new Vue(Object.assign({
  router,
  data: { store }
}, App))

// Prepare the confirm modal and sync list helpers
prepareSyncList(app.store)
prepareConfirm(app.store)

// Check if user is logged in then launch the app unless we are rendering from the server
if(Vue.prototype.$isServer) {
  app.$mount('#app')
} else {
  auth.isLoggedIn()
    .then(res => app.$mount('#app'))
    .catch(err => app.$mount('#app'))
}

module.exports = { app, router, store }
