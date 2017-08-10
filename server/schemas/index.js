/**
 * Checks for mongoose in the browser and if it's not loaded recognizes this is a node environment. Mongoose in the browser has a promise bug that is fixed by using bluebird
 */

if(!global.mongoose) {
  global.mongoose = require('mongoose')
} else {
  global.mongoose.Promise = Promise
}

module.exports = {
  // inject schemas
  message: require("./message.js"),
  roles: require("./roles.js"),
  settings: require("./settings.js"),
  user: require("./user.js"),
  // end inject schemas
};
