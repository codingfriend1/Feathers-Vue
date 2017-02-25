const _ = require('lodash');
const errors = require('feathers-errors');

module.exports = function hasPermission(permission) {
  return function(hook) {

    if (!hook.params.provider) { return hook; }

    if(_.get(hook, 'params.user.role') === 'admin') { return hook; }

    const name = _.get(hook, 'params.user.name') || _.get(hook, 'params.user.email');

    if(!_.get(hook, 'params.user')) {

      throw new errors.NotAuthenticated('Cannot check permissions if you are not logged in.');

    } else if(!_.get(hook, 'params.user.permissions')) {

      throw new errors.GeneralError(`${name} does not have any permissions.`);

    } else if(!hook.params.user.permissions.includes(permission)) {

      throw new errors.Forbidden(`${name} does not have permission to do that.`);

    }

  }
};
