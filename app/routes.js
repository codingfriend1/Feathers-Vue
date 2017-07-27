// The component names are the global vue component names
/**
 * Example
 *   Vue.component('home', require("./home.vue"))
 *   In this case 'home' refers to home.vue
 */

const login = require('./views/login.vue')

module.exports = [
  {
    "path": '/',
    "component": "home"
  },
  {
    "path": "left-panel",
    "component": "left_panel"
  },
  {
    "path": "right-panel",
    "component": "right_panel"
  },
  {
    "path": 'login',
    "component": "login"
  },
  {
    "path": 'sign-up',
    "component": "login"
  },
  {
    "path": 'verify-account/:slug',
    "component": "login"
  },
  {
    "path": 'verify-account-changes/:slug',
    "component": "login"
  },
  {
    "path": 'change-email',
    "component": "login"
  },
  {
    "path": 'change-password',
    "component": "login"
  },
  {
    "path": 'reset-password/:slug',
    "component": "login"
  }
]
