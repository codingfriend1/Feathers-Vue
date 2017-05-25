// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const validatePattern = require('../utils/validate-pattern');

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
  const users = new mongooseClient.Schema({
    bitbucketId: { type: String },
    bitbucket: { type: mongooseClient.Schema.Types.Mixed },
    dropboxId: { type: String },
    dropbox: { type: mongooseClient.Schema.Types.Mixed },
    facebookId: { type: String },
    facebook: { type: mongooseClient.Schema.Types.Mixed },
    githubId: { type: String },
    github: { type: mongooseClient.Schema.Types.Mixed },
    googleId: { type: String },
    google: { type: mongooseClient.Schema.Types.Mixed },
    instagramId: { type: String },
    instagram: { type: mongooseClient.Schema.Types.Mixed },
    linkedinId: { type: String },
    linkedin: { type: mongooseClient.Schema.Types.Mixed },
    paypalId: { type: String },
    paypal: { type: mongooseClient.Schema.Types.Mixed },
    spotifyId: { type: String },
    spotify: { type: mongooseClient.Schema.Types.Mixed },
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    name: { type: String, required: false },

    isEnabled: {
      type: Boolean,
      'default': true
    },

    role: {
      required: true,
      type: String,
      trim: true,
      validate: validatePattern('isTitle')
    },

    color: {
      required: false,
      type: String,
      trim: true,
      enum: colors,
      default: function() {
        return colors[Math.floor(Math.random()*colors.length)]
      }
    },

    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now },

    isVerified: { type: Boolean },
    verifyToken: { type: String },
    verifyExpires: { type: Date }, // or a long integer
    verifyChanges: { type: Object }, // an object (key-value map), e.g. { field: "value" }
    resetToken: { type: String },
    resetExpires: { type: Date } // or a long integer
  });

  return mongooseClient.model('users', users);
};
