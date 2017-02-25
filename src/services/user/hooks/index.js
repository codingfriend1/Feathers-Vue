'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const common = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;

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
    permissions: (item, hook) => item.access.permissions,
  },
  exclude: ['access', '_include']
};

exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission('manageUsers')
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission('manageUsers')
    // auth.restrictToOwner({ ownerField: '_id' })
  ],
  create: [
    auth.hashPassword(),
    common.lowerCase('email'),
    verifyHooks.addVerification(),
    globalHooks.setDefaultRole(),
    globalHooks.setFirstUserToRole({role: 'admin'})
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.isEnabled(),
    globalHooks.hasPermissionOrRestrictChanges('manageUsers', {
      restrictOn: ['role', 'isEnabled']
    }),
    globalHooks.preventDisabledAdmin()
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.hasPermissionOrRestrictChanges('manageUsers', {
      restrictOn: ['role', 'isEnabled']
    }),
    globalHooks.preventDisabledAdmin()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.isEnabled()
  ]
};

exports.after = {
  all: [
    hooks.remove('password')
  ],
  find: [
    common.populate({ schema }),
    common.serialize(serializeSchema),
    hooks.remove([ '_computed'])
  ],
  get: [
    common.populate({ schema }),
    common.serialize(serializeSchema),
    hooks.remove([ '_computed'])
  ],
  create: [
    globalHooks.sendVerificationEmail(),
    verifyHooks.removeVerification(),
  ],
  update: [],
  patch: [],
  remove: []
};
