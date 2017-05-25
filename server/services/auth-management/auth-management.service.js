// Initializes the `authManagement` service on path `/authManagement`
const authManagement = require('feathers-authentication-management');
const hooks = require('./auth-management.hooks');
const notifier = require('./notifier');

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.configure(authManagement(notifier(app)));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('authManagement');

  service.hooks(hooks);
};
