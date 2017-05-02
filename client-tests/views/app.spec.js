const Vue = require('vue')
const test = require('tape');
const { root, prepareTests } = require('../utils')


var vm

function setup() {
	vm = root()
}

function teardown() {
	vm = null
}

var testing = prepareTests(setup, teardown)


testing('app.vue should contain inital store message', function(t) {

	t.equal(vm.$store.message, 'Welcome to Front-Vue')

  t.end();
  
})
