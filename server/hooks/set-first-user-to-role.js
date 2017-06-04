const _ = require('lodash');
const { getItems } = require('feathers-hooks-common');

module.exports = options => hook =>
  new Promise((resolve, reject) => {

    hook.app.service('/users').find({query: {}}).then(function(found) {
      console.log("Checking if first user");
      if(!Array.isArray(found) && found.data) {
        found = found.data
      }

      if(found.length === 0) {
        var firstUser = _.castArray(getItems(hook))[0];
        
        firstUser.role = options.role || 'admin'
        console.log('set role to admin');
      }

      resolve(hook)
    }, function(err) {
      reject(err)
    });

  })
