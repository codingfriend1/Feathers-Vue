const errors = require('feathers-errors');
const _ = require('lodash')

module.exports = (options) => {
  return async hook => {

    let defaults = {
      queryField: 'email'
    };

    let config = Object.assign(defaults, options);

    if(!hook.params.provider) { return hook; }

    if(!hook.data.email) {
      throw new errors.BadRequest(`You must provide an email to authenticate a user`);
    }

    let query = {}
    query[config.queryField] = _.get(hook.data, config.queryField);

    let [err, found] = await to(hook.app.service('users').find({ query }) );

    let user = _.get(found, 'data.0') || _.get(found, '0');

    if(err) {

      throw new errors.GeneralError(`Error searching users.`);

    } else if(user) {

      const name = _.get(user, 'name') || _.get(user, 'email');

      if(user.isEnabled === true || user.isEnabled === 'true') {
        return hook;
      } else {
        throw new errors.Forbidden(`${name} is disabled.`);
      }

    } else {

      throw new errors.NotFound(`A user matching ${_.get(hook.data, config.queryField)} could not be found.`);

    }

  }
}
