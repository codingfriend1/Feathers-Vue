// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { getItems } = require('feathers-hooks-common');

const _ = require('lodash');
const errors = require('feathers-errors');

module.exports = function (fieldToSet = 'userId') { // eslint-disable-line no-unused-vars
  return function (hook) {

  	if(!_.get(hook, 'params.user._id')) {
  		throw new errors.NotAuthenticated(`The current user is missing. You must not be authenticated.`);
  	}

  	( _.castArray( getItems(hook) ) )
  	  .forEach(item => { item[fieldToSet] = _.get(hook, 'params.user._id'); });

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
