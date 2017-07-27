// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { authenticate } = require('feathers-authentication').hooks;
const { queryWithCurrentUser } = require('feathers-authentication-hooks');
const isEnabled = require('./is-enabled');
const hasPermissionBoolean = require('./has-permission-boolean');
const { checkContext } = require('feathers-hooks-common');

const _ = require('lodash')

const { unless } = require('feathers-hooks-common');

const defaults = {
	idField: '_id',
	as: 'userId'
}

// For a given service, if the user is the owner of the item, `userId` matches, allow an update, otherwise the the user must have the given permission to update the item
module.exports = function ({ permission, options }) { // eslint-disable-line no-unused-vars

	const settings = Object.assign({}, defaults, options);

  return [
	  authenticate('jwt'),
	  isEnabled(),
	  function useFindInsteadOfGet(hook) {

	  	checkContext(hook, 'before', ['find', 'update', 'patch', 'delete'], 'useFindInsteadOfGet');

	  	if(hook.id) {
	  		_.set(hook.params.query, settings.idField, hook.id);
	  		hook.id = null;
	  		hook.params.wasGET = true;
	  	}
	  },
    unless(
      hasPermissionBoolean(permission),
    	queryWithCurrentUser(settings)
    )
  ]
};
