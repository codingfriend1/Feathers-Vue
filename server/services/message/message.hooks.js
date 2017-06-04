const { authenticate } = require('feathers-authentication').hooks;
const isEnabled = require('../../hooks/is-enabled');
const associateCurrentUser = require('../../hooks/associate-current-user');
const ownerOrPermission = require('../../hooks/owner-or-permission');

const { iff, isNot, discard, setCreatedAt, setUpdatedAt } = require('feathers-hooks-common');

const errors = require('feathers-errors');
const _ = require('lodash');

module.exports = {
  before: {
    all: [],
    find: [
      
    ],
    get: [
      
    ],
    create: [
      authenticate('jwt'),
      isEnabled(),
      setCreatedAt(),
      associateCurrentUser()
    ],
    update: [
      ...ownerOrPermission({ service: 'message', permission: 'manageMessages'}),
      setUpdatedAt()
    ],
    patch: [
      ...ownerOrPermission({ service: 'message', permission: 'manageMessages'}),
      setUpdatedAt()
    ],
    remove: [
      ...ownerOrPermission({ service: 'message', permission: 'manageMessages'})
    ]
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
