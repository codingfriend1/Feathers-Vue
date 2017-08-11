const _ = require('lodash')
const feathers = require('./feathers.service')

function makeEasy(endpoint) {

  var service = feathers.service.bind(feathers);
  var _database = {}

  Object.defineProperty(_database, 'create', {
    enumerable: true,
    configurable: false,
    get: () => { return null },
    set: function(data) {
      var promise = service(endpoint).create(data)

      promise.then((result) => {
        radio.$emit(endpoint + ':upsert', result.data || result);
        return result
      })
    },
  })

  Object.defineProperty(_database, 'upsert', {
    enumerable: true,
    configurable: false,
    get: () => { return null },
    set: function(command) {
      var promise
      if(command._id) {
        promise = service(endpoint).patch(command._id, command)
      } else {
        promise = service(endpoint).create(command)
      }

      promise.then((result) => {
        radio.$emit(endpoint + ':upsert', result.data || result);
        return result
      })
    },
  })

  Object.defineProperty(_database, 'patch', {
    enumerable: true,
    configurable: false,
    get: () => { return null },
    set: function(command) {
      var promise = service(endpoint).patch(command.id, command.updates, { query: command.query })

      promise.then((result) => {
        radio.$emit(endpoint + ':patch', result.data || result);
        return result
      })
    },
  })

  Object.defineProperty(_database, 'update', {
    enumerable: true,
    configurable: false,
    get: () => { return null },
    set: function(command) {
      var promise = service(endpoint).update(command.id, command.updates, { query: command.query })

      promise.then((result) => {
        radio.$emit(endpoint + ':update', result.data || result);
        return result
      })
    },
  })

  Object.defineProperty(_database, 'find', {
    enumerable: true,
    configurable: false,
    get: () => { return null },
    set: function(command) {
      var promise

      if(typeof command === 'string') {
        promise = service(endpoint).find({ query: {_id: command } })
      } else if(typeof command === 'object') {
        promise = service(endpoint).find({ query: command })
      }

      promise.then((result) => {
        radio.$emit(endpoint + ':find', result.data || result);
        return result
      })
    },
  })

  Object.defineProperty(_database, 'get', {
    enumerable: true,
    configurable: false,
    get: () => { return null },
    set: function(command) {
      var promise
      if(typeof command === 'string') {
        promise = service(endpoint).get(command)
      } else if(typeof command === 'object') {
        promise = service(endpoint).get(command.id, { query: command.query })
      }

      promise.then((result) => {
        radio.$emit(endpoint + ':get', result.data || result);
        return result
      })
    },
  })

  Object.defineProperty(_database, 'remove', {
    enumerable: true,
    configurable: false,
    get: () => { return null },
    set: function(command) {
      var promise
      if(typeof command === 'string') {
        promise = service(endpoint).remove(command)
      } else if(typeof command === 'object') {
        promise = service(endpoint).remove(command.id, { query: command.query })
      }
      
      promise.then((result) => {
        radio.$emit(endpoint + ':remove', result.data || result);
        return result
      })
    },
  })

  return _database
}


module.exports = function getset(endpoint) {
  return makeEasy(endpoint)
};