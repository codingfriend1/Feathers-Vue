const Vue = require('vue')
const _ = require('lodash')

const schemas = require('./schemas')


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
    return _.map(_.get(err, 'errors', []), err =>
      err.message
        .replace('Path ', '')
        .replace('`', '')
        .replace('`', ''))
      .join('<br>')
  }
}

function formatErrors(err) {
  var errors = {}
  _.get(err, 'inner', []).forEach(err => {
    if(_.get(err, 'path') && _.get(err, 'message')) {
      errors[err.path] = err.message
    }
  })
  return errors
}

/**
 * Global pub/sub system for vue
 * @example ```
 *   radio.$on('eventName', value => {})
 *   radio.$emit('eventName', 5)
 * ```
 */
const radio = new Vue()

// checkValid(data, schema, field)
/**
 * Sets validation errors to the errors property of the data passed in
 * @param {object} data The data to validate against
 * @param {string|object} schema The schema property name or schema definition itself
 * @return {Promise} Returns boolean of if data is valid
 */
const checkValid = async function checkValid(data, schema, field) {

  let foundSchema = typeof schema === 'string' ? 
    _.get(schemas, schema): schema

  if(!foundSchema) { 
    return Promise.reject({errors: [`Schema doesn't exist`]}) 
  }

  let [err, validData] = await to( 
    foundSchema.validate(data, { abortEarly: false })
  )

  if(err) {

    var errors = formatErrors(err)

    if(!data.errors) {
      Vue.set(data, 'errors', {})
    }
    if (field) {
      Vue.set(data.errors, field, err[field])
    } else {
      Vue.set(data, 'errors', errors)
    }
    return false
  } else {
    Vue.set(validData, 'errors', {})
    return validData
  }

}

const validateLive = _.debounce(checkValid, 500)

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
global.checkValid = checkValid
global.validateLive = validateLive
global.a_or_an = a_or_an
global.confirm = confirm
global.prepareConfirm = prepareConfirm

module.exports = {
  to,
  parseErrors,
  radio,
  validateLive,
  a_or_an,
  confirm,
  prepareConfirm
}
