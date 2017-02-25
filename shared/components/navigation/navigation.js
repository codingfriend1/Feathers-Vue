import Vue from 'vue'

export default Vue.component('navigation', {
  store: ['routes', 'tasks'],
  template: require('./navigation.jade')
})
