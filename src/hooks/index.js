// Add any common hooks you want to share across services in here.
//
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

exports.allowUpsert = require('./allow-upsert');
exports.isEnabled = require('./is-enabled');
exports.hasPermission = require('./has-permission');
exports.setFirstUserToRole = require('./set-first-user-role');
exports.setDefaultRole = require('./set-default-role');
exports.sendVerificationEmail = require('./send-verification-email');
exports.isTargetEnabled = require('./is-target-enabled');
exports.hasPermissionOrRestrictChanges = require('./permission-or-restrict-changes');
exports.preventDisabledAdmin = require('./prevent-disabled-admin');
exports.ownerOrRestrict = require('./owner-or-restrict');
