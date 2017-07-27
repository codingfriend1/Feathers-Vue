
const _ = require('lodash');
const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const isEnabled = require('../../hooks/is-enabled');
const setDefaultRole = require('../../hooks/set-default-role');
const setFirstUserToRole = require('../../hooks/set-first-user-to-role');
const sendVerificationEmail = require('../../hooks/send-verification-email');
const hasPermissionsBoolean = require('../../hooks/has-permissions-boolean');
const preventDisabledAdmin = require('../../hooks/prevent-disabled-admin');
const verifyHooks = require('feathers-authentication-management').hooks;
const loopItems = require('../../hooks/loop-items')


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
    childField: 'role'
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
      setFirstUserToRole({role: 'admin'}),
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
    ],
    find: [
      commonHooks.populate({ schema }),
      commonHooks.serialize(serializeSchema),
    ],
    get: [
      commonHooks.populate({ schema }),
      commonHooks.serialize(serializeSchema),
    ],
    create: [
      sendVerificationEmail(),
      verifyHooks.removeVerification()
    ],
    update: [
      commonHooks.populate({ schema }),
      commonHooks.serialize(serializeSchema),
    ],
    patch: [
      commonHooks.populate({ schema }),
      commonHooks.serialize(serializeSchema),
    ],
    remove: [
      commonHooks.populate({ schema }),
      commonHooks.serialize(serializeSchema),
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
