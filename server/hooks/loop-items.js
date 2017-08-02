// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { getItems } = require('feathers-hooks-common');
const _ = require('lodash')

module.exports = function loopItems(cb) { // eslint-disable-line no-unused-vars

	if(!cb) {
		throw new Error('You must provide a callback');
	}

  return function (hook) {

  	_.forEach(_.castArray(getItems(hook)), cb)

    return Promise.resolve(hook);
  };
};
