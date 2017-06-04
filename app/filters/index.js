const Vue = require('vue')
const _ = require('lodash')

var filters = {

	dollar: function(value) {

		if(!_.isFinite(parseFloat(value))) {
			return value;
		}

    var p = Number(value).toFixed(2).split(".");

    return "$" + p[0].split("").reverse().reduce(function(acc, value, i, orig) {
        return  value === "-" ? acc : value  + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
  },

}



// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})