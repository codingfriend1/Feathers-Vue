// settings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const validatePattern = require('../utils/validate-pattern');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const settings = new mongooseClient.Schema({
	  name: {
	    type: String,
	    trim: true,
	    required: true,
	    unique: true,
	    validate: validatePattern('isTitle')
	  },
	  value: {
	    type: mongooseClient.Schema.Types.Mixed,
	    required: true
	  }
	});

  return mongooseClient.model('settings', settings);
};
