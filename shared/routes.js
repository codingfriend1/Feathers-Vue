// inject views
var home = require("../app/views/home.vue")
var login = require("../app/views/login.vue")
var admin = require("../admin/views/admin.vue")
var user_management = require("../admin/views/user-management.vue")
// end inject views

module.exports = [
  {
    path: '/',
    name: 'Home',
    component: home,
    meta: {
      subtitle: 'Welcome to Front-Vue!'
    }
  }
  // {
  //   path: '/login/:type?/:slug?',
  //   name: 'Login',
  //   component: login,
  //   meta: {
  //     subtitle: ''
  //   }
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: admin,
  //   meta: {
  //     subtitle: 'Welcome to Front-Vue!'
  //   }
  // },
  // {
  //   path: '/admin/users',
  //   name: 'users',
  //   component: user_management,
  //   meta: {
  //     subtitle: 'Users and Roles'
  //   }
  // },
  // {
  //   path: '/admin/:view',
  //   name: 'adminView',
  //   component: admin,
  //   meta: {
  //     excludeMenu: true,
  //     subtitle: 'Welcome to Front-Vue!'
  //   }
  // }
]
