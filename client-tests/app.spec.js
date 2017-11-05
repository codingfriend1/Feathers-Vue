const Vue = require('Vue')


describe('app.vue', () => {

  let { app, router, store } = require('@app/boot')

  it('renders route as a class name', (done) => {
    router.push('/home-page')
    router.onReady(() => {
      Vue.prototype.$nextTick(() => {
        expect(app.$el.classList.contains('home-page'))
          .toBe(true)
          
        router.replace('/')

        router.onReady(() => {
          Vue.prototype.$nextTick(() => {
            expect(app.$el.classList.contains('home-page'))
              .toBe(false)
            done()
          })
        })
      })
    })
  })
})