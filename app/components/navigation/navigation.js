const Vue = require('vue')

module.exports = Vue.component('navigation', {
  store: ['routes', 'tasks'],
  template: require('./navigation.jade')
})
