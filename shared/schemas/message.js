const patterns = require('../patterns')

exports.schema = {
  text: {
    type: String,
    required: true,
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
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
