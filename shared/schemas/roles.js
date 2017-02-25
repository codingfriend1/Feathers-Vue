const patterns = require('../patterns')

const sitePermissions = [
  'email',
  'delete',
  'create',
  'update',
  'read',
  'manageUsers',
  'manageRoles'
]

exports.schema = {
  role: {
  	type: String,
  	required: true,
  	unique: true,
  	trim: true,
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
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
