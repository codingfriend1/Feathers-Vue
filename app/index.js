const Vue = require('vue')
const routes = require('./routes')
const store = require('./store')

require('./css/app.styl')
require('./vendor')
require('./services')
require('./filters')
require('./components')
require('./views')

const App = require('./views/app.vue')

const app = new Vue(Object.assign(App, {
  framework7: {
	  root: '#app',
	  material: true,
    pushState: true,
    modalCloseByOutside: true,
    popupCloseByOutside: true,
    popoverCloseByOutside: true,
    actionsCloseByOutside: true,
	  routes
  },
  data: { store }
}))

// Prepare the sync list helper
prepareSyncList(app.store)

// Check if user is logged in then launch the app unless we are rendering from the server
if(Vue.prototype.$isServer) {
  app.$mount('#app')
} else {
  auth.isLoggedIn()
    .then(res => app.$mount('#app'))
    .catch(err => app.$mount('#app'))
}
