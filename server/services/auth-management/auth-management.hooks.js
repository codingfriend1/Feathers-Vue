const isEnabled = require('../../hooks/is-enabled');
const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');

const isAction = () => {
    let args = Array.from(arguments)
    return hook => args.includes(hook.data.action);
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      commonHooks.iff(
        isAction('passwordChange', 'identityChange'),
        [
          authenticate('jwt'),
          isEnabled()
        ]
      ),      
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
