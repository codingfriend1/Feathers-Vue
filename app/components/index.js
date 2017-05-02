const Vue = require('vue')

// // inject shared components js
// // end inject shared components js

// globalize vue components
Vue.component('confirm', require("./confirm.vue"))
Vue.component('foot', require("./foot.vue"))
Vue.component('heading', require("./heading.vue"))
Vue.component('modal', require("./modal.vue"))
Vue.component('navigation', require("./navigation.vue"))
Vue.component('simple_input', require("./simple-input.vue"))
// end globalize vue components