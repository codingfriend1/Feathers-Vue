// message-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const validatePattern = require('../utils/validate-pattern');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const message = new mongooseClient.Schema({
	  text: {
	    type: String,
	    required: true,
	    validate: validatePattern('isTitle')
	  },
	  userId: {
	    type: mongooseClient.Schema.ObjectId,
	    ref: 'user',
	    required: true
	  },
	  createdAt: {
	    type: Date,
	    'default': Date.now
	  },
	  updatedAt: {
	    type: Date,
	    'default': Date.now
	  }
	});

  return mongooseClient.model('message', message);
};
