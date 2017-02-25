import Vue from 'vue'

export default function(context) {
  var store, app, router, boot
  if(context.admin) {
    boot = require('../admin/boot')
  } else {
    boot = require('../app/boot')
  }

  store = boot.store
  app = boot.app
  router = boot.router

  const meta = app.$meta()

  router.push(context.url)
  let matchedComponents = router.getMatchedComponents()

  // no matched routes
  if (!matchedComponents.length) {
    return Promise.reject({ code: '404' })
  }


  // We wait for the "beforeCreate" and "created" hooks to finish their promises before rendering. You can run an isomorphic ajax library such as axios or isomorphic-fetch in it. It should be a function You that returns a promise and when it resolves it will render the html. This allows you to fetch all your ajax data before the html is sent. The store is attached to this and passed in as the first parameter as well

  return Promise.all(matchedComponents.map(async component => {

    const componentInstance = new Vue(Object.assign(component, { data: () => ({
      store: app.$store
    }) }))

    if (component.beforeCreate) {
      try {
        await component.beforeCreate.apply(componentInstance)
      } catch(err) {}
    }
    if(component.created) {
      try {
        await component.created.apply(componentInstance)
      } catch(err) {}
    }
    return true
  })).then(() => {
    context.initialState = app.$store
    context.meta = meta
    return app
  })

};
