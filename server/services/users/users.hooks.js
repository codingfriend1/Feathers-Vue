
const _ = require('lodash');
const { authenticate } = require('feathers-authentication').hooks;

const commonHooks = require('feathers-hooks-common');

const { restrictToOwner } = require('feathers-authentication-hooks');

const verifyHooks = require('feathers-authentication-management').hooks;

const {
  isEnabled,
  setDefaultRole,
  setFirstUserToRole,
  sendVerificationEmail,
  hasPermissionsBoolean,
  preventDisabledAdmin,
  loopItems,
} = require('../../hooks');


const { hashPassword } = require('feathers-authentication-local').hooks;

const restrict = [
  authenticate('jwt'),
  isEnabled(),
  commonHooks.unless(
    hasPermissionsBoolean('manageUsers'),
    restrictToOwner({
      idField: '_id',
      ownerField: '_id'
    })
  )
];

function setUserInitials(item) {
  if(item.name) {
    item.initials = _.get(item, 'name', '')
      .match(/\b(\w)/g)
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
}

const schema = {
  include: [{
    service: 'roles',
    nameAs: 'access',
    parentField: 'role',
    childField: 'role',
    provider: undefined
  }],
};

const serializeSchema = {
  computed: {
    permissions: (item, hook) => _.get(item, 'access.permissions'),
  },
  exclude: ['access', '_include']
};

module.exports = {
  before: {
    all: [],
    find: [ 
      authenticate('jwt'),
      isEnabled(),
    ],
    get: [ 
      authenticate('jwt'),
      isEnabled(),
    ],
    create: [ 
      hashPassword(),
      verifyHooks.addVerification(),
      setDefaultRole(),
      setFirstUserToRole({ role: 'admin' }),
      preventDisabledAdmin(),
      loopItems(setUserInitials)
    ],
    update: [ 
      commonHooks.disallow('external')
    ],
    patch: [ 
      ...restrict,
      commonHooks.iff(commonHooks.isProvider('external'), commonHooks.preventChanges(
        'email',
        'isVerified',
        'verifyToken',
        'verifyShortToken',
        'verifyExpires',
        'verifyChanges',
        'resetToken',
        'resetShortToken',
        'resetExpires'
      )),
      preventDisabledAdmin(),
      loopItems(setUserInitials)
    ],
    remove: [ 
      ...restrict
    ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password', '_computed', 'verifyExpires', 'resetExpires', 'verifyChanges')
      ),
      commonHooks.populate({ schema }),
      commonHooks.serialize(serializeSchema),
    ],
    find: [
      
    ],
    get: [
      
    ],
    create: [
      sendVerificationEmail(),
      verifyHooks.removeVerification(),
      
    ],
    update: [
      
    ],
    patch: [
      
    ],
    remove: [
      
    ]
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
