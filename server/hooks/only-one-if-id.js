const _ = require('lodash');
const errors = require('feathers-errors');
const { checkContext } = require('feathers-hooks-common');

module.exports = function onlyOneIfWasGET(property = 'wasGET') {
  return function(hook) {
    checkContext(hook, 'after');
    if(hook.params[property]) {
      hook.result = hook.result[0]
    }
  }
};
