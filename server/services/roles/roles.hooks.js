const { authenticate } = require('feathers-authentication').hooks;
const hasPermissions = require('../../hooks/has-permissions');
const hasAnyPermission = require('../../hooks/has-any-permission');
const isEnabled = require('../../hooks/is-enabled');

module.exports = {
  before: {
    all: [ 
      authenticate('jwt'),
      isEnabled(),
      hasPermissions('manageRoles')
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
