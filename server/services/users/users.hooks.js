
const _ = require('lodash');
const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const isEnabled = require('../../hooks/is-enabled');
const setDefaultRole = require('../../hooks/set-default-role');
const setFirstUserToRole = require('../../hooks/set-first-user-to-role');
const sendVerificationEmail = require('../../hooks/send-verification-email');
const hasPermissionBoolean = require('../../hooks/has-permission-boolean');
const preventDisabledAdmin = require('../../hooks/prevent-disabled-admin');
const verifyHooks = require('feathers-authentication-management').hooks;


const { hashPassword } = require('feathers-authentication-local').hooks;

const restrict = [
  authenticate('jwt'),
  isEnabled(),
  commonHooks.unless(
    hasPermissionBoolean('manageUsers'),
    restrictToOwner({
      idField: '_id',
      ownerField: '_id'
    })
  )
];

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
      ...restrict 
    ],
    get: [ 
      ...restrict
    ],
    create: [ 
      hashPassword(),
      verifyHooks.addVerification(),
      setDefaultRole(),
      setFirstUserToRole({role: 'admin'}),
      preventDisabledAdmin()
    ],
    update: [ 
      ...restrict, 
      hashPassword(),
      preventDisabledAdmin()
    ],
    patch: [ 
      ...restrict,
      preventDisabledAdmin()
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
      )
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
