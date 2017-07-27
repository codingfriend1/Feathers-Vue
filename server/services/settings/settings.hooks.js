const { authenticate } = require('feathers-authentication').hooks;
const hasPermissions = require('../../hooks/has-permissions');
const isEnabled = require('../../hooks/is-enabled');

module.exports = {
  before: {
    all: [ 
      authenticate('jwt'),
      isEnabled(),
      hasPermissions('manageSettings')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
