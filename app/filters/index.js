var filters = {}



// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})