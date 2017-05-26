const _ = require('lodash');
const patterns = require('../patterns');

module.exports = function(key) {
	return {
	  validator: function(v) {
	    return _.get(patterns, key).test(v);
	  },
	  message: _.get(patterns, 'messages.' + key)
	};
};

exports.patterns = patterns;