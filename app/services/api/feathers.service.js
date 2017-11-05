const { url } = require('./url.service')
const feathers = require('feathers/client')
const hooks = require('feathers-hooks')

const axios = require('axios')
const authentication = require('feathers-authentication/client')
const rest = require('feathers-rest/client')
const AuthManagement = require('feathers-authentication-management/lib/client')

var localstorage
var socketio
var io

if(typeof window !== 'undefined') {
  localstorage = require('feathers-localstorage')
  socketio = require('feathers-socketio/client')
  io = require('socket.io-client')
  var socket = io(url)
}

const app = feathers()
  .configure(hooks())

if(typeof window === 'undefined') {
  app
    .configure(rest(url).axios(axios))
} else {
  app
    .configure(socketio(socket))
    .configure(authentication({ storage: window.localStorage, path: '/api/authentication' }))
}

global.feathers = app
module.exports = app
