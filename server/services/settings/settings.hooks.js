const { authenticate } = require('feathers-authentication').hooks;
const hasPermission = require('../../hooks/has-permission');
const isEnabled = require('../../hooks/is-enabled');

module.exports = {
  before: {
    all: [ 
      authenticate('jwt'),
      isEnabled(),
      hasPermission('manageSettings')
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
