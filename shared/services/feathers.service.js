const { url } = require('./config.service')
const Vue  = require('vue')
const feathers = require('feathers/client')
const hooks = require('feathers-hooks')

const axios = require('axios')
const authentication = require('feathers-authentication/client')
const rest = require('feathers-rest/client')
const AuthManagement = require('feathers-authentication-management/lib/client')

var localstorage
var socketio
var io

if(!Vue.prototype.$isServer) {
  localstorage = require('feathers-localstorage')
  socketio = require('feathers-socketio/client')
  io = require('socket.io-client')
  var socket = io(url)
  socket = io(window.location.origin)
}

const app = feathers()
  .configure(hooks())


if(Vue.prototype.$isServer) {
  app
    .configure(rest(url.replace('/api/', '')).axios(axios))
} else {
  app
    .configure(socketio(socket))
    .configure(authentication({ storage: window.localStorage, localEndpoint: '/api/auth/local', tokenEndpoint: '/api/auth/token' }))
}

global.feathers = app
module.exports = app
