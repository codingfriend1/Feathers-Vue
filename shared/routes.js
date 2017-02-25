// inject views
import home from "../app/views/home.vue"
import login from "../app/views/login.vue"
import admin from "../admin/views/admin.vue"
import user_management from "../admin/views/user-management.vue"
// end inject views

export default [
  {
    path: '/',
    name: 'Home',
    component: home,
    meta: {
      subtitle: 'Welcome to Front-Vue!'
    }
  },
  {
    path: '/login/:type?/:slug?',
    name: 'Login',
    component: login,
    meta: {
      subtitle: ''
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    meta: {
      subtitle: 'Welcome to Front-Vue!'
    }
  },
  {
    path: '/admin/users',
    name: 'users',
    component: user_management,
    meta: {
      subtitle: 'Users and Roles'
    }
  },
  {
    path: '/admin/:view',
    name: 'adminView',
    component: admin,
    meta: {
      excludeMenu: true,
      subtitle: 'Welcome to Front-Vue!'
    }
  }
]
