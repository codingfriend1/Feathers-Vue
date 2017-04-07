const endpoints = require('./endpoints.service.js')

const api = {
  roles: new endpoints('roles'),
  users: new endpoints('users'),
  messages: new endpoints('messages'),
  auth: new endpoints('auth/local'),
  authManagement: new endpoints('authManagement')
};

global.api = api
module.exports = api
