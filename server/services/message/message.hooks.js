const { authenticate } = require('feathers-authentication').hooks;
const isEnabled = require('../../hooks/is-enabled');
const associateCurrentUser = require('../../hooks/associate-current-user');
const permissionsOrOwner = require('../../hooks/permission-or-owner');
const hasPermissions = require('../../hooks/has-permissions');

const { iff, isNot, discard, setCreatedAt, setUpdatedAt } = require('feathers-hooks-common');
const commonHooks = require('feathers-hooks-common');

const errors = require('feathers-errors');
const _ = require('lodash');

const schema = {
  include: [{
    service: 'users',
    nameAs: 'user',
    parentField: 'userId',
    childField: '_id',
    query: {
      $select: ['name', '_id', 'color', 'initials']
    },
  }],
};

/**
 * IMPORTANT
 * `permissionsOrOwner` hook should be the last hook in the "before" chain if used in the "get" method
 */

const permissions = [ 'manageMessages' ];

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
      ...permissionsOrOwner({ permissions }),
      setUpdatedAt()
    ],
    patch: [
      ...permissionsOrOwner({ permissions }),
      setUpdatedAt()
    ],
    remove: [
      ...permissionsOrOwner({ permissions })
    ]
  },

  after: {
    all: [
      commonHooks.populate({ schema }),
    ],
    find: [

    ],
    get: [

    ],
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
