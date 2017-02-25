'use strict';

const service = require('feathers-mongoose');
const hooks = require('./hooks');
const models = require('../../../shared/schemas').models

module.exports = function() {
  const app = this;

  const options = {
    Model: models.message,
    lean: true,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/messages', service(options));

  // Get our initialize service to that we can bind hooks
  const messageService = app.service('/messages');

  // Set up our before hooks
  messageService.before(hooks.before);

  // Set up our after hooks
  messageService.after(hooks.after);
};
