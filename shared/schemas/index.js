import _ from 'lodash'

/**
 * Checks for mongoose in the browser and if it's not loaded recognizes this is a node environment. Mongoose in the browser has a promise bug that is fixed by using bluebird
 */

if(!global.mongoose) {
  global.mongoose = require('mongoose')
} else {
  const bluebird = require('bluebird')
  global.mongoose.Promise = bluebird
}

let schemas = {
  // inject schemas
  message: require("./message.js"),
  roles: require("./roles.js"),
  settings: require("./settings.js"),
  user: require("./user.js"),
  // end inject schemas
}
let models = {}



/**
 * Maps patterns and patternMessages into mongoose validators and creates mongoose models
 */

_.forOwn(schemas, (schema, key) => {
  const composition = schema.schema
  const validations = schema.validations
  _.forOwn(composition, function(val, key) {
    if(val.pattern && val.patternMessage) {
      composition[key].validate = {
        validator: function(v) {
          return val.pattern.test(v)
        },
        message: val.patternMessage
      }
    }
  })
  schemas[key].schema = new global.mongoose.Schema(composition)

  if(validations) {
    _.forOwn(validations, function(val, k) {
      if(k === 'pre') {
        _.forOwn(validations.pre, function(val, k) {
          schemas[key].schema.pre(k, val)
        })
      } else if (k === 'post') {
        _.forOwn(validations.post, function(val, k) {
          schemas[key].schema.post(k, val)
        })
      }
    })
  }

  if(global.mongoose.model) {
    models[key] = global.mongoose.model(key, schemas[key].schema)
  }
})

module.exports = {
  models,
  schemas
}
