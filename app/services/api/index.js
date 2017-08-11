const endpoints = require('./endpoints.service.js')
const getset = require('./getset')

const api = {
  roles: new endpoints('roles'),
  users: new endpoints('users'),
  messages: new endpoints('message'),
  auth: new endpoints('auth/local'),
  authManagement: new endpoints('authManagement')
};

const db = {
  roles: getset('api/roles'),
  users: getset('api/users'),
  messages: getset('api/message'),
  auth: getset('api/auth/local'),
  authManagement: getset('api/authManagement')
};



global.api = api
global.db = db
module.exports = api
