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



module.exports = router;
