const { authenticate } = require('feathers-authentication').hooks;
const isEnabled = require('../../hooks/is-enabled');
const associateCurrentUser = require('../../hooks/associate-current-user');
const permissionOrOwner = require('../../hooks/permission-or-owner');

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
      $select: ['name', '_id', 'color', 'initials'],
      $sort: {createdAt: -1}
    },
  }],
};

/**
 * IMPORTANT
 * `permissionOrOwner` hook should be the last hook in the "before" chain if used in the "get" method
 */

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
      ...permissionOrOwner({ permission: 'manageMessages' }),
      setUpdatedAt()
    ],
    patch: [
      ...permissionOrOwner({ permission: 'manageMessages' }),
      setUpdatedAt()
    ],
    remove: [
      ...permissionOrOwner({ permission: 'manageMessages' })
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
