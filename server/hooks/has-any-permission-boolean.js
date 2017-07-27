const _ = require('lodash');
const errors = require('feathers-errors');

module.exports = function hasAnyPermissionBoolean() {

  const permissions = Array.from(arguments) || [];

  return function(hook) {

    if (!hook.params.provider) { return true; }

    if(
        !_.get(hook, 'params.user.role') === 'admin' || 

        !_.get(hook, 'params.user.permissions') || 

        !hook.params.user.permissions.some(p => permissions.includes(p))
      ) {

      return false;

    } else {

      return true;

    }
  }
  
};
