/**
 * Prepare Environment
 */
const test = require('tape')
const tapSpec = require('tap-spec')

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout)

test.onFinish(() => process.exit(0))

// Prepare window, dom, and browser-mongoose
require('jsdom-global')()
global.mongoose = require('./mockMongoose.js')


/**
 * Prepare boot
 */
const Vue = require('vue')
const store = require('../app/boot/store-reconciliation')
const router = require('./mockRouting.js')

/**
 * Prepare services
 */
require('../app/services')

/**
 * Prepare vue components
 */
const App = require('../app/views/app.vue')
require('../app/components')


/**
 * Prepare mock api
 */
const MockedSocket = require('socket.io-mock')
global.window.io = new MockedSocket();
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
var mockAxios = new MockAdapter(axios)


/**
 * Prepare Helper Functions
 */

// Initiates a component within the root component
function load(component, route) {

  return new Promise((resolve, reject) => {

    var vm = new Vue({
      router,
      data: { store: _.cloneDeep(store) },
      template: '<div><c ref="testComponentReference"></c></div>',
      components: {
        c: component
      }
    })

    global.prepareSyncList(vm.store)

    vm.$mount()

    if(route) { router.push(route) }

    Vue.nextTick(() => {
      resolve(vm.$refs.testComponentReference)
    })
    
  })
}

// Returns the initiated root component
function root() {
  var vm = new Vue(Object.assign({
    router,
    data: { store: _.clone(store, true) },
  }, App))

  global.prepareSyncList(vm.store)

  vm.$mount()

  return vm
}

// Wraps tape tests with the setup and teardown method provided
function prepareTests(setup, teardown) {
  return function testing (description, fn) {
    test(description, async function (t) {
      setup();
      await fn(t);
      teardown();
    });
  }
}

global.window.Vue = Vue
global.window.load = load
global.window.mockAxios = mockAxios

module.exports = { 
  router, 
  store, 
  mockAxios, 
  load, 
  root, 
  prepareTests 
}
