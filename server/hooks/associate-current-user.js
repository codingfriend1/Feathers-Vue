// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { getItems } = require('feathers-hooks-common');

const _ = require('lodash');
const errors = require('feathers-errors');

const defaults = {
  idField: '_id',
  fieldToSet: 'userId'
};

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars

  const settings = Object.assign({}, defaults, options)

  return function (hook) {

  	if(!_.get(hook, `params.user[${settings.idField}]`)) {
  		throw new errors.NotAuthenticated(`The current user is missing. You must not be authenticated.`);
  	}

  	( _.castArray( getItems(hook) ) )
  	  .forEach(item => { item[settings.fieldToSet] = _.get(hook, `params.user[${settings.idField}]`); });

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
