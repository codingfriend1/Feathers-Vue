var messages = {}

exports.isTitle = /^[A-Za-z0-9@:?&=.\/ _\-]*$/
messages.isTitle = `Can only contain letters, numbers, and @ : ? & = . / _ -`

exports.isURI = /(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}((\/|#)[\w~,\-\.\/?%&+#=]*))/
messages.isURI = `Must be a valid internet link address`

exports.isFilePath = /^[0-9A-Za-z \/*_.\\\-]*$/
messages.isFilePath = `Can only contain letters, numbers, and / * _ . \ -`

exports.isCSSClass = /^[A-Za-z0-9_ \-*]*$/
messages.isCSSClass = `Can only contain letters, numbers, and _ - *`

exports.isAnchorTarget = /^[_blank|_self|_parent|_top]*$/
messages.isAnchorTarget = `Must be _blank, _self, _parent, or _top`

exports.messages = messages
