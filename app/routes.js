// The component names are the global vue component names
/**
 * Example
 *   Vue.component('home', require("./home.vue"))
 *   In this case 'home' refers to home.vue
 */

module.exports = [
  {
    "path": '/',
    "component": "home"
  },
  {
    "path": "/left-panel",
    "component": "left_panel"
  },
  {
    "path": "/right-panel",
    "component": "right_panel"
  },
  {
    "path": '/login',
    "component": "login"
  },
  {
    "path": '/login/:type/:slug',
    "component": "login"
  }
]
