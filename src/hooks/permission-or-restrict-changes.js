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

      options.restrictOn = _.castArray(options.restrictOn);

      var includeS = '';

      const restrictions = _
        .chain(options.restrictOn)
        .map(restriction => _.has(hook.data, restriction)? restriction: null)
        .compact()
        .value()
        .join(', ');

      if(!restrictions) { return hook; }

      if(restrictions.split(',').length > 0) {
        restrictions = restrictions.replace(/,(?!.*,)/gmi, ' or');
        if(restrictions.split(',').length > 1) {
          includeS = 's';
        }
      }

      throw new errors.Forbidden(`${name} is not permitted to update the ${restrictions} field${includeS}.`);

    }

    return hook;
  };
}
