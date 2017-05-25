const authManagement = require('./auth-management/auth-management.service.js');
const users = require('./users/users.service.js');
const settings = require('./settings/settings.service.js');
const roles = require('./roles/roles.service.js');
const message = require('./message/message.service.js');
const email = require('./email/email.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(authManagement);
  app.configure(users);
  app.configure(settings);
  app.configure(roles);
  app.configure(message);
  app.configure(email);
};
