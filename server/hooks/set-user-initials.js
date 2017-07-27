// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { getItems } = require('feathers-hooks-common');
const _ = require('lodash')

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

	  _.castArray(getItems(hook))
	    .forEach(item => {
	    	if(item.name) {
	    		item.initials = _.get(item, 'name', '')
	    		  .match(/\b(\w)/g)
	    		  .join('')
	    		  .slice(0, 2)
	    		  .toUpperCase();
	    	}
	    })
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
