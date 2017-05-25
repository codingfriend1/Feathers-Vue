// roles-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const validatePattern = require('../utils/validate-pattern');

const sitePermissions = [
  'email',
  'delete',
  'create',
  'update',
  'read',
  'manageUsers',
  'manageRoles',
  'manageSettings'
]

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const roles = new mongooseClient.Schema({
	  role: {
	  	type: String,
	  	required: true,
	  	unique: true,
	  	trim: true,
	    validate: validatePattern('isTitle'),
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
	});

  return mongooseClient.model('roles', roles);
};
