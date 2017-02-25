const _ = require('lodash');
const errors = require('feathers-errors');

module.exports = function isEnabled(options) {
  return function(hook) {
    if (!hook.params.provider) { return hook; }

    if(_.get(hook, 'params.user.role') === 'admin') { return hook; }

    if(!hook.params.user) {

      throw new errors.NotAuthenticated('Cannot check enabled of a non-existant user.');

    } else if(!_.get(hook, 'params.user.isEnabled')) {

      const name = _.get(hook, 'params.user.name') || _.get(hook, 'params.user.email');

      throw new errors.Forbidden(`${name} is disabled.`);
    }
  }
};
