const errors = require('feathers-errors')

module.exports = options => {
  return hook => {
    if(hook.params) {
      hook.params = Object.assign({}, hook.params, { mongoose: {upsert: true} })
    }
  }
}
