// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { authenticate } = require('feathers-authentication').hooks;
const { queryWithCurrentUser } = require('feathers-authentication-hooks');
const isEnabled = require('./is-enabled');
const hasPermissionsBoolean = require('./has-permissions-boolean');
const { checkContext } = require('feathers-hooks-common');

const { to } = require('../utils/to')

const _ = require('lodash')

const { unless } = require('feathers-hooks-common');

const defaults = {
	idField: '_id',
	as: 'userId'
}

// For a given service, if the user is the owner of the item, `userId` matches, allow an update, otherwise the the user must have the given permission to update the item
module.exports = function ({ permissions, options }) { // eslint-disable-line no-unused-vars

	const settings = Object.assign({}, defaults, options);

	permissions = _.castArray(permissions)

  return [
	  authenticate('jwt'),
	  isEnabled(),
    unless(
      hasPermissionsBoolean(...permissions),
    	function useFindInsteadOfGet(hook) {

    		checkContext(hook, 'before', ['get', 'find', 'patch', 'put', 'remove'], 'useFindInsteadOfGet');

    		queryWithCurrentUser(settings)(hook);

    		if(hook.id) {

    			_.set(hook.params.query, settings.idField, hook.id);
    			hook.id = null;

    			if(hook.method === 'get') {
    				return hook.service.find(hook.params).then(results => { 
    						hook.result = _.get(results, 'data[0]', _.get(results, '0'));
    						return hook;
    				 })
    			}
    			
    		}
    		return hook;
    	}
    )
  ]
};
