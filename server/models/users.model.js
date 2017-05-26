// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const validatePattern = require('../utils/validate-pattern');
const schemas = require('../schemas');

const colors = [
  '#1ABC9C',
  '#16A085',
  '#2ECC71',
  '#27AE60',
  '#3498DB',
  '#2980B9',
  '#34495E',
  '#EA4C88',
  '#CA2C68',
  '#9B59B6',
  '#8E44AD',
  '#F1C40F',
  '#F39C12',
  '#E74C3C',
  '#C0392B'
]

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema(schemas.users);

  return mongooseClient.model('users', users);
};
