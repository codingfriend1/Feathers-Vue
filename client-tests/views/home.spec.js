const Vue = require('vue')
const { mockAxios, prepareTests, load } = require('../utils')
var sinon = require('sinon')
const home = require('../../app/views/home.vue')

function setup() {
	
}

function teardown() {
	mockAxios.reset()
}

const testing = prepareTests(setup, teardown)

testing('home.vue - should call the messages api and set the store on load', async function(t) {

	mockAxios.onGet(api.messages.url).reply(200, {
	  data: "This came from the test"
	});

	sinon.spy(api.messages, 'find')

	var vm = await load(home, '/')

  t.equal(vm.$store.message, 'Welcome to Front-Vue')

  setTimeout(function() {
    t.equal(api.messages.find.callCount, 1)
    t.equal(vm.$store.message, 'This came from the test')
    t.end()
  })
	
})
