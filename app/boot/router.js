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

  next();

})

module.exports = router;
