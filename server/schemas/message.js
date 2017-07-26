module.exports = {
  text: {
    type: String,
    required: true
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
