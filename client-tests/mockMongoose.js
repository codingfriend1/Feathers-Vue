function Schema() {
  return {
    pre: function() {},
    post: function() {}
  }
}

Schema.ObjectId = function() {},
Schema.Types = {
  Mixed: function() {
    return {}
  }
}

global.mongoose = {
  Schema
}

module.exports = mongoose