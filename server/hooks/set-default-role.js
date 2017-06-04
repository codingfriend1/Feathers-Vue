const _ = require('lodash');
const { getItems } = require('feathers-hooks-common');
const { to } = require('../utils/to');

module.exports = function(options = {}) {
  return function(hook) {
    return new Promise(async (resolve, reject) => {
      if(hook.data) {

        let [ err, defaultRole ] = await to( hook.app.service('settings').find({ name: 'defaultRole' }) );

        if(!err) {
          defaultRole = _.get(defaultRole, '0');
          const role = _.get(defaultRole, 'value.role') || 'basic';

          ( _.castArray( getItems(hook) ) )
            .forEach(item => { item.role = role; });

        } else {
          console.log('Error setting default role', err);
        }

        resolve(hook);
      }
    })
  }
}
