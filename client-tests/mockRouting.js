const Vue = require('vue')
const Meta = require('vue-meta')
const VueRouter = require('vue-router')
const routes = require('../app/routes')

Vue.use(Meta)
Vue.use(VueRouter)

const router = new VueRouter({
    hashbang: false,
    routes
})

module.exports = router