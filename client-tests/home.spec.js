const { shallow } = require('vue-test-utils')
const Vue = require('Vue')
const _ = require('lodash')
const { url } = require('@app/services/api/url.service')

describe('Home.vue', function() {

  let { app, router, store } = require('@app/boot')

  it('store.messages should intially be empty', function() {
    expect(_.cloneDeep(store.messages))
      .toEqual({}, 'store messages should initially be empty')
  });

  it('Should fetch the messages', done => {
    router.replace(url)
    router.onReady(() => {
      Vue.prototype.$nextTick(() => {
        setTimeout(() => {
          expect(store.messages.length)
            .toBe(2)
          done()
        }, 500)
      })
    })
  })
})