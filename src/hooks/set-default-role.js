const _ = require('lodash');

module.exports = options => hook =>
  new Promise(async (resolve, reject) => {
    if(hook.data) {
      try {
        let defaultRole = await hook.app.service('settings').find({name: 'defaultRole'})
        defaultRole = _.get(defaultRole, '0');
        const role = _.get(defaultRole, 'value.role');
        hook.data.role = role? role: '';
        resolve(hook);
      } catch(err) {
        resolve(hook);
      }
    }
  })
