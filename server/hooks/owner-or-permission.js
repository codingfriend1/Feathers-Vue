// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { authenticate } = require('feathers-authentication').hooks;
const isEnabled = require('./is-enabled');
const isUserOwner = require('./is-user-owner');
const hasPermissionBoolean = require('./has-permission-boolean');

const { iff, isNot } = require('feathers-hooks-common');
const errors = require('feathers-errors');
const _ = require('lodash');


// For a given service, if the user is the owner of the item, `userId` matches, allow an update, otherwise the the user must have the given permission to update the item
module.exports = function ({ service, permission }) { // eslint-disable-line no-unused-vars
  return [
	  authenticate('jwt'),
	  isEnabled(),
	  iff(
	    isNot( isUserOwner({ service }) ),
	    iff(
	      isNot( hasPermissionBoolean(permission) ),
	      function(hook) {

	        // Get the user's name or email
	        const name = _.get(hook, 'params.user.name') || _.get(hook, 'params.user.email');

	        return Promise.reject(new errors.Forbidden(`${name} is neither the owner nor has the permission to edit this message.`));
	      }
	    )
	  )
  ]
};
