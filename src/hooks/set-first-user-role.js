module.exports = options => hook =>
  new Promise((resolve, reject) => {
    hook.app.service('/users').find({query: {}}).then(function(found) {
      console.log("Checking if first user", found);
      if(!Array.isArray(found) && found.data) {
        found = found.data
      }

      if(found.length === 0) {
        hook.data.role = options.role || 'admin'
        console.log('set role to admin');
      }

      resolve(hook)
    }, function(err) {
      reject(err)
    });
  })
