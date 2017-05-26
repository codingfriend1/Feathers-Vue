const { authenticate } = require('feathers-authentication').hooks;
const isEnabled = require('../../hooks/is-enabled');
const isUserOwner = require('../../hooks/is-user-owner');
const ownerOrRestrict = require('../../hooks/owner-or-restrict');
const hasPermissionBoolean = require('../../hooks/has-permission-boolean');
const associateCurrentUser = require('../../hooks/associate-current-user');

const { iff, isNot, discard, setCreatedAt, setUpdatedAt } = require('feathers-hooks-common');

const ownerOrPermission = [
  authenticate('jwt'),
  isEnabled(),
  iff(
    isNot( isUserOwner({ service: 'message' }) ),
    [
      iff(
        isNot( hasPermissionBoolean('manageMessages') ),
        [
          function(hook) {
            console.log('hook.data', hook.data);
          }
        ]
      )
    ]
  )
];

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
      ...ownerOrPermission,
      setUpdatedAt()
    ],
    patch: [
      ...ownerOrPermission,
      setUpdatedAt()
    ],
    remove: [
      ...ownerOrPermission
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
