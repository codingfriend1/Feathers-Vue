// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const _ = require('lodash');
const errors = require('feathers-errors');

const defaults = {
  idField: '_id',
  ownerField: 'userId'
};

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

    if (!hook.params.user) {
      return Promise.resolve(false);
    }

    options = Object.assign({}, defaults, hook.app.get('auth'), options);

    const id = hook.params.user[options.idField];

    if (id === undefined) {
      throw new Error(`'${options.idField} is missing from current user.'`);
    }

    // look up the document and throw a Forbidden error if the user is not an owner
    return new Promise((resolve, reject) => {
      // Set provider as undefined so we avoid an infinite loop if this hook is
      // set on the resource we are requesting.
      const params = Object.assign({}, hook.params, { provider: undefined });

      return hook.service.get(hook.id, params).then(data => {
        if (data.toJSON) {
          data = data.toJSON();
        }
        else if (data.toObject) {
          data = data.toObject();
        }

        console.log('data', data);

        let field = data[options.ownerField];

        // Handle nested Sequelize or Mongoose models
        if (_.isPlainObject(field)) {
          field = field[options.idField];
        }

        if (Array.isArray(field)) {

          const fieldArray = field.map(idValue => idValue.toString());

          if (fieldArray.length === 0 || fieldArray.indexOf(id.toString()) < 0) {
            return resolve(false);
          }

        } else if ( field === undefined || field.toString() !== id.toString() ) {
          return resolve(false);
        }

        resolve(true);
        
      }).catch(reject);
    });
  };
};
