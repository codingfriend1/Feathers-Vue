const accountService = require('../services/auth-management/notifier');

module.exports = (options = {}) => hook => {

  if (!hook.params.provider) { return hook; }

  const user = hook.result;

  if(hook.app.get('GMAIL') && hook.data && hook.data.email && user) {
    accountService(hook.app).notifier('resendVerifySignup', user);
    return hook;
  }

  return hook;
}
