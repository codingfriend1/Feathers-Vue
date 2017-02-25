'use strict';

const service = require('feathers-mongoose');
const hooks = require('./hooks');
const models = require('../../../shared/schemas').models

module.exports = function() {
  const app = this;

  const options = {
    Model: models.user,
    lean: true,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', service(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
};
