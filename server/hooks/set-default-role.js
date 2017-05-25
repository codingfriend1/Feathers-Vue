const _ = require('lodash');
const { getItems } = require('feathers-hooks-common');

module.exports = function(options = {}) {
  return function(hook) {
    return new Promise(async (resolve, reject) => {
      if(hook.data) {
        try {
          let defaultRole = await hook.app.service('settings').find({name: 'defaultRole'})
          defaultRole = _.get(defaultRole, '0');
          const role = _.get(defaultRole, 'value.role');

          ( _.castArray( getItems(hook) ) )
            .forEach(item => { item.role = role; });

          resolve(hook);
        } catch(err) {
          console.log('err', err);
          resolve(hook);
        }
      }
    })
  }
}
