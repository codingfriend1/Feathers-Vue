// Initializes the `settings` service on path `/settings`
const createService = require('feathers-mongoose');
const createModel = require('../../models/settings.model');
const hooks = require('./settings.hooks');
const filters = require('./settings.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'settings',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/settings', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('settings');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
