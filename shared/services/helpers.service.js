const Vue = require('vue')
const _ = require('lodash')

if(!Vue.prototype.$isServer) {
  global.schemas = require('../../shared/schemas').schemas
}


/**
 *
 * Useful Helper functions for creating apps
 */

 /**
  *
  * Transforms a promise for "await" to return both error and result so you don't have to wrap promises in try catch
  * @example ```
  *
  * var [ error, result ] = await to(promise)
  *
  * ```
  */
const to = function to(promise) {
  return promise.then(result => [null, result]).catch(err => [err, null])
}

const parseErrors = function parseErrors(err) {
  if(err.name) {
    return err.message
  } else {
    return _.map(err.errors, err =>
      err.message
        .replace('Path ', '')
        .replace('`', '')
        .replace('`', ''))
      .join('<br>')
  }

}

/**
 * Global pub/sub system for vue
 * @example ```
 *   radio.$on('eventName', value => {})
 *   radio.$emit('eventName', 5)
 * ```
 */
const radio = new Vue()


// ### isValid(schema, data, field)
/**
 * Validates data against a mongoose schema
 * @param {Object} schema Mongoose schema
 * @param {Object} data The data to validate against
 * @param {string} field Only validate one field
 * @return {Promise} Rejects with mongoose errors or resolves with 'valid'
 */
const isValid = function isValid(schema, data, field) {
  return new Promise((resolve, reject) => {
    let doc = global.mongoose.Document(_.cloneDeep(data), schema)
    doc.validate((err) => {
      if(!err) { return resolve(data) }

      let errors = _.forOwn(err.errors, function(val, key) {
        err.errors[key] = val.message.replace('Path ', '').replace('`', '').replace('`', '')
      })

      reject(errors)
    })
  })
}

// checkValid(data, schema, field)
/**
 * Sets validation errors to the errors property of the data passed in
 * @param {object} data The data to validate against mongooose
 * @param {string|object} schema The schema property name or mongoose schema object itself
 * @param {string} field Validate one specific field instead of all of them
 * @return {Promise} Returns boolean of if data is valid
 */
const checkValid = async function checkValid(data, schema, field) {

  let foundSchema = typeof schema === 'string'? _.get(schemas, `${schema}.schema`): schema.schema

  let [validationErrors] = await to( isValid(foundSchema, data, field) )

  if(validationErrors) {
    if(!data.errors) {
      Vue.set(data, 'errors', {})
    }
    if(field) {
      Vue.set(data.errors, field, validationErrors[field])
    } else {
      Vue.set(data, 'errors', validationErrors)
    }
    return false
  } else {
    Vue.set(data, 'errors', {})
    return true
  }

}

const validateLive = _.debounce(async function validateLive(data, schema, field) {
  checkValid(data, schema, field)
}, 500)

const a_or_an = function a_or_an(field) {
  return /[aeiou]/.test(field.charAt(0)) ? 'an' : 'a'
}

const confirm = function confirm(message, store) {
  return new Promise(async resolve => {

    store.modalConfig = {
      answer: resolve,
      message
    }
    store.currentModal = 'confirm'
  })
}

const prepareConfirm =  function prepareConfirm(store) {
  global.confirm = _.partialRight(confirm, store)
  return global.confirm
}

global.radio = radio
global.to = to
global.parseErrors = parseErrors
global.isValid = isValid
global.checkValid = checkValid
global.validateLive = validateLive
global.a_or_an = a_or_an
global.confirm = confirm
global.prepareConfirm = prepareConfirm

module.exports = {
  to,
  parseErrors,
  radio,
  isValid,
  validateLive,
  a_or_an,
  confirm,
  prepareConfirm
}
