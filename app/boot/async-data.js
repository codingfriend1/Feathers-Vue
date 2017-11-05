const Vue = require('vue')

Vue.mixin({
 beforeMount () {
   const { asyncData } = this.$options
   if (asyncData) {
     this.dataPromise = asyncData({
       store: this.$store,
       route: this.$route
     })
   }
 }
})

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})