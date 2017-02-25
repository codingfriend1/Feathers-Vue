const errors = require('feathers-errors');
import helpers from '../../shared/services/helpers.service'
import _ from 'lodash'

module.exports = (options) => {
  return async hook => {

    if(!hook.params.provider) { return hook; }

    if(!hook.data.email) {
      throw new errors.BadRequest(`You must provide an email to authenticate a user`);
    }

    let [err, found] = await to(hook.app.service('users').find({query: {email: hook.data.email}}) );

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
      
      throw new errors.NotFound(`${hook.data.email} is not a user.`)

    }

  }
}
