const Vue = require('vue')

module.exports = function(context) {

  return new Promise((resolve, reject) => {

    var { store, app, router } = require('./boot')

    const meta = app.$meta()

    router.push(context.url)

    router.onReady(() => {
      let matchedComponents = router.getMatchedComponents()

      // no matched routes
      if (!matchedComponents.length) {
        return Promise.reject(new Error(`There are no vue components for this url: ${context.url}`))
      }


      // call `asyncData()` on all matched route components
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store
        context.meta = meta
        resolve(app)
      }).catch(reject)
    })
  })
};
