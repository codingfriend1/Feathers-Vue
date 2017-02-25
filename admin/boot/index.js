import Vue from 'vue'
import store from './store-reconciliation'
import router from '../../shared/boot/router'

import prepareSyncList from '../../shared/services/sync-list.service'
import '../../shared/services/api.service'
import '../../shared/services/notification.service'
import '../../shared/services/helpers.service'

import '../../shared/components'
import '../components'
import '../views'
import App from '../views/app.vue'

import * as filters from '../filters'

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


export { app, router, store }
