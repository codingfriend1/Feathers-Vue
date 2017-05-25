const _ = require('lodash')
const errors = require('feathers-errors')

module.exports = options => async hook => {
  if (!hook.params.provider) { return hook; }

  if(hook.data.isEnabled === false) {

    let query = {}

    if(hook.id) {
      query = { _id: hook.id }
    } else if(_.get(hook, 'data._id')) {
      query = { _id: hook.data._id }
    } else if (_.get(hook, 'data.name')) {
      query = { name: hook.data.name }
    } else if (_.get(hook, 'data.email')) {
      query = { email: hook.data.email }
    }

    let [err, result] = await to(hook.app.service('/users').find({ query }))

    let user = _.get(result, 'data.0') || _.get(result, '0')

    if(err) {
      throw new errors.GeneralError(`Something went wrong on the server and we could not search users.`)
    } else if(user && user.role === 'admin') {
      throw new errors.NotAcceptable(`An admin cannot be disabled.`)
    } else if(!user) {
      throw new errors.NotFound(`Could not check if user is an admin.`)
    }
  }

  return hook
}
