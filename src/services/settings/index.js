'use strict';

const service = require('feathers-mongoose');
const models = require('../../../shared/schemas').models
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: models.settings,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/settings', service(options));

  // Get our initialize service to that we can bind hooks
  const settingsService = app.service('/settings');

  // Set up our before hooks
  settingsService.before(hooks.before);

  // Set up our after hooks
  settingsService.after(hooks.after);
};
