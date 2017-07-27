// Application hooks that run for every service
const logger = require('./hooks/logger');
const onlyOneIfWasGET = require('./hooks/only-one-if-was-get');

module.exports = {
  before: {
    all: [

    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ 
      // logger(),
      onlyOneIfWasGET()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
