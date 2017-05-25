const _ = require('lodash');
const errors = require('feathers-errors');

module.exports = function hasPermissionBoolean(permission) {

  return function(hook) {

    if (!hook.params.provider) { return Promise.resolve(true); }

    if(
        !_.get(hook, 'params.user.role') === 'admin' || 

        !_.get(hook, 'params.user.permissions') || 

        !hook.params.user.permissions.includes(permission)

      ) {
      
      return Promise.resolve(false);

    } else {

      return Promise.resolve(true);

    }
  }
  
};
