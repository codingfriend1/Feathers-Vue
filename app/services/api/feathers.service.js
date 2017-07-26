

/**
 * IMPORTANT
 * ================================
 * Edit this to match the address of your server
 * If doing local development I recommend your development server address or personal computer ip and port 3030.
 * If in production change this value to your server
 */
const url = `http://localhost:3030/`
/**
 * =================================
 * IMPORTANT
 * 
 */


const feathers = require('feathers/client')
const hooks = require('feathers-hooks')

const axios = require('axios')
const authentication = require('feathers-authentication/client')
const rest = require('feathers-rest/client')
const AuthManagement = require('feathers-authentication-management/lib/client')

const localstorage = require('feathers-localstorage')
const socketio = require('feathers-socketio/client')
const io = require('socket.io-client')
const socket = io(url)

const app = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(authentication({ storage: window.localStorage, localEndpoint: '/api/auth/local', tokenEndpoint: '/api/auth/token' }))

global.feathers = app
module.exports = app
