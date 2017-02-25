import Vue from 'vue'

import store from '../app/boot/store-reconciliation'
import router from '../app/boot/router'

import api from '../app/services/api.service'
import '../app/services/helpers.service'
import '../app/services/notification.service'

import '../app/components'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
var mock = new MockAdapter(axios);

import VueStash from 'vue-stash'

Vue.use(VueStash)

function load(component, route) {
  const vm = new Vue({
    router,
    data: { store: _.clone(store, true) },
    template: '<div><c ref="testComponentReference"></c></div>',
    components: {
      c: component
    }
  }).$mount()

  if(route) {
    router.push(route)
  }

  return vm.$refs.testComponentReference
}

window.Vue = Vue
window.load = load
window.mock = mock

export { Vue, router, store, mock, api, load }
