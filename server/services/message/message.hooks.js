const { authenticate } = require('feathers-authentication').hooks;

const { iff, isNot, discard, setCreatedAt, setUpdatedAt } = require('feathers-hooks-common');
const commonHooks = require('feathers-hooks-common');

const {
  loopItems,
  hasPermissions,
  permissionsOrOwner,
  associateCurrentUser,
  isEnabled
} = require('../../hooks')

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
    provider: undefined
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
      loopItems(item => {
        if(!item.user) {
          item.user = {
            name: 'Deleted User',
            _id: '',
            color: 'black',
            initials: 'X'
          }
        }
      })
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
