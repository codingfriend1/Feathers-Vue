// settings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const validatePattern = require('../utils/validate-pattern');
const schemas = require('../schemas');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const settings = new mongooseClient.Schema(schemas.settings);

  return mongooseClient.model('settings', settings);
};
