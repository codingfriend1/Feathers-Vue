import errors from 'feathers-errors';
import _ from 'lodash'

module.exports = (permissionName, options) => {
  return (hook) => {

    if (!hook.params.provider) { return hook; }

    if(_.get(hook, 'params.user.role') === 'admin') { return hook; }

    const name = _.get(hook, 'params.user.name') || _.get(hook, 'params.user.email');

    if(!_.get(hook, 'params.user')) {

      throw new errors.NotAuthenticated('Cannot check permissions if you are not logged in.');

    } else if(!_.get(hook, 'params.user.permissions')) {

      throw new errors.GeneralError(`${name} does not have any permissions.`);

    } else if(!_.get(hook, 'params.user.permissions').includes(permissionName)) {

      const name = _.get(hook, 'params.user.name') || _.get(hook, 'params.user.email');

      for (var i = 0; i < options.restrictOn.length; i++) {
        if(hook.data.hasOwnProperty(options.restrictOn[i])) {
          throw new errors.Forbidden(`${name} is not permitted to update the '${options.restrictOn[i]}' field.`);
        }
      }

    }

    return hook;
  };
}
