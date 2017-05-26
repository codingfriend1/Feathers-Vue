// roles-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const validatePattern = require('../utils/validate-pattern');
const schemas = require('../schemas');

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
  const roles = new mongooseClient.Schema(schemas.roles);

  return mongooseClient.model('roles', roles);
};
