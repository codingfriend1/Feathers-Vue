const views = {
  // inject views
  home: require("./views/home.vue"),
  login: require("./views/login.vue"),
  // end inject views
}


module.exports = [
  {
    path: '/',
    name: 'Home',
    component: views.home,
    meta: {
      subtitle: 'Welcome to Front-Vue!'
    }
  },
  {
    path: '/login/:type?/:slug?',
    name: 'Login',
    component: views.login,
    meta: {
      subtitle: ''
    }
  }
]
