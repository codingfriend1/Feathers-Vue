const Vue = require('vue')
const Meta = require('vue-meta')
const VueRouter = require('vue-router')
const routes = require('../routes')

Vue.use(Meta)
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    hashbang: false,
    routes
})

// If switching between admin and app we want to do a full page refresh instead of just an ajax route change
router.beforeEach(async (to, from, next) => {

  if(!Vue.prototype.$isServer) {
    if(to.fullPath.startsWith('/admin') && (!from.fullPath.startsWith('/admin') && from.fullPath !== '/')) {
      window.location.href = to.fullPath
    } else if (!to.fullPath.startsWith('/admin') && from.fullPath.startsWith('/admin')) {
      window.location.href = to.fullPath
    } else {
      next()
    }
  } else {
    next()
  }

})

module.exports = router;
