const validatePattern = require('../utils/validate-pattern');

module.exports = {
  text: {
    type: String,
    required: true,
    validate: validatePattern('isTitle')
  },
  userId: {
    type: global.mongoose.Schema.ObjectId,
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
};
