'use strict';
const settings = require('./settings');
const roles = require('./roles');
const message = require('./message');
const authentication = require('./authentication');
const authManagement = require('./authManagement');
const user = require('./user');
const email = require('./email');
const mongoose = require('mongoose');

module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(authManagement);
  app.configure(email);
  app.configure(user);
  app.configure(message);
  app.configure(roles);
  app.configure(settings);
};
