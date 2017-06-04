const _ = require('lodash');
const errors = require('feathers-errors');

module.exports = function hasPermissionBoolean(permission) {

  return function(hook) {

    if (!hook.params.provider) { return true; }

    if(
        !_.get(hook, 'params.user.role') === 'admin' || 

        !_.get(hook, 'params.user.permissions') || 

        !hook.params.user.permissions.includes(permission)

      ) {

      return false;

    } else {

      return true;

    }
  }
  
};
