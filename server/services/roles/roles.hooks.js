const { authenticate } = require('feathers-authentication').hooks;
const hasPermission = require('../../hooks/has-permission');

module.exports = {
  before: {
    all: [ 
      authenticate('jwt'),
      hasPermission('manageRoles')
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
