const patterns = require('../patterns')
const Schema = global.mongoose.Schema;

exports.schema = {
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  }
};
