const { shallow } = require('vue-test-utils')
const Vue = require('Vue')
const _ = require('lodash')
const { url } = require('@app/services/api/url.service')
const api = require('@app/services/api/index')
const auth = require('@app/services/auth.service')
const {
  click,
  waitForAppLoad,
  asyncTimeout
} = require('./helpers.service.js')

async function createMessages() {
  var isLoggedIn = await auth.login({
    type: 'local',
    email: 'admin@test.com',
    password: 'admin'
  })

  if(isLoggedIn) {
    await api.messages.delete({})
    await api.messages.create([
      {
        text: 'test 1',
        userId: auth.currentUser._id,
      },
      {
        text: 'test 2',
        userId: auth.currentUser._id,
      },
    ])
    return true
  } else {
    return false
  }
}

describe('Home.vue', function() {

  var app, router, store, home
  before(async () => {
    await createMessages();
    ({ app, router, store } = require('@app/boot'))
    router.replace('/')
    await waitForAppLoad()
    home = app.$refs.mainView
  })

  it('Should fetch the messages', () => {
    expect(Object.keys(store.messages).length).toBe(2)
  })

  it('Should contain two message elements', () => {

    const results = [
      'test 1',
      'test 2'
    ]

    Array.from(
      home.$el.querySelectorAll('.message .message-text')
    )
      .forEach((message, index) => {
        expect(message.textContent).toEqual(results[index])
      })
    
  })

  it('should be able to create a new message', async function() {

    const results = [
      'test 1',
      'test 2',
      'test 3'
    ]

    home.newMessage.text = 'test 3'
    var sendBtn = home.$el.querySelector('.btn-success')
    click(sendBtn)

    await asyncTimeout(1000)
    await Vue.nextTick()

    Array.from(
      home.$el.querySelectorAll('.message .message-text')
    )
      .forEach((message, index) => {
        expect(message.textContent).toEqual(results[index])
      })

    expect(Object.keys(store.messages).length).toBe(3)
  })
})