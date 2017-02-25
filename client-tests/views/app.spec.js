import Vue from 'vue'
import { router, store } from '../utils'
import App from '../../app/views/app.vue'

describe('app.vue', function () {

  var vm = new Vue(Object.assign({
    router,
    data: { store: _.clone(store, true) },
  }, App)).$mount()

  it('should contain inital store message', function() {
    expect(vm.$store.message).toBe('Welcome to Front-Vue')
  })

})
