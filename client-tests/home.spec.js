const { shallow } = require('vue-test-utils')
const Vue = require('Vue')
const _ = require('lodash')
const { url } = require('@app/services/api/url.service')
const api = require('@app/services/api/index')
const auth = require('@app/services/auth.service')
const {
  click
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
  })

  it('Should fetch the messages', done => {
    router.onReady(() => {
      Vue.prototype.$nextTick(() => {
        setTimeout(() => {
          expect(Object.keys(store.messages).length)
            .toBe(2)
          done()
        }, 500)
      })
    })
  })

  it('Should contain two message elements', done => {

    const results = [
      'test 1',
      'test 2'
    ]

    Vue.prototype.$nextTick(() => {
      home = app.$refs.mainView
      var messages = Array.from(
        home.$el
          .querySelectorAll('.message .message-text')
      )
        .forEach((message, index) => {
          expect(message.textContent).toEqual(results[index])
        })

      done()
    })
    
  })

  it('should be able to create a new message', function(done) {
    
    const results = [
      'test 1',
      'test 2',
      'test 3'
    ]

    Vue.prototype.$nextTick(() => {
      home = app.$refs.mainView
      home.newMessage.text = 'test 3'
      var sendBtn = home.$el.querySelector('.btn-success')
      click(sendBtn)

      setTimeout(() => {
        Vue.prototype.$nextTick(() => {
          Array.from(
            home.$el
              .querySelectorAll('.message .message-text')
          )
            .forEach((message, index) => {
              expect(message.textContent).toEqual(results[index])
            })

          expect(Object.keys(store.messages).length).toBe(3)

          done()
        })
      }, 1000)
    })
  })
})