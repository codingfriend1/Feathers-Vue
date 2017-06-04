const validatePattern = require('../utils/validate-pattern');

const sitePermissions = [
  'email',
  'delete',
  'create',
  'update',
  'read',
  'manageUsers',
  'manageMessages',
  'manageRoles',
  'manageSettings'
]

module.exports = {
  role: {
  	type: String,
  	required: true,
  	unique: true,
  	trim: true,
    validate: validatePattern('isTitle')
  },
  permissions: [{
    type: String,
    enum: sitePermissions
  }],
  createdAt: {
    type: Date,
    'default': Date.now
  },
  updatedAt: {
    type: Date,
    'default': Date.now
  }
};
