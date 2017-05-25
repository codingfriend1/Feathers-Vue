const _ = require('lodash');

const patterns = {
	isTitle: {
		regex: /^[A-Za-z0-9@:?&=.\/ _\-]*$/,
		message: `Can only contain letters, numbers, and @ : ? & = . / _ -`
	},
	isURI: {
		regex: /(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}((\/|#)[\w~,\-\.\/?%&+#=]*))/,
		message: `Must be a valid internet link address`
	},
	isFilePath: {
		regex: /^[0-9A-Za-z \/*_.\\\-]*$/,
		message: `Can only contain letters, numbers, and / * _ . \ -`
	},
	isCSSClass: {
		regex: /^[A-Za-z0-9_ \-*]*$/,
		message: `Can only contain letters, numbers, and _ - *`
	},
	isAnchorTarget: {
		regex: /^[_blank|_self|_parent|_top]*$/,
		message: `Must be _blank, _self, _parent, or _top`
	},
};

module.exports = function(key) {
	return {
	  validator: function(v) {
	    return _.get(patterns, `${key}.regex`).test(v);
	  },
	  message: _.get(patterns, `${key}.message`)
	};
};

exports.patterns = patterns;