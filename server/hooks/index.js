
module.exports = {
	// inject hooks

	associateCurrentUser: require("./associate-current-user.js"),

	hasAnyPermissionBoolean: require("./has-any-permission-boolean.js"),

	hasAnyPermission: require("./has-any-permission.js"),

	hasPermissionsBoolean: require("./has-permissions-boolean.js"),

	hasPermissions: require("./has-permissions.js"),

	isEnabled: require("./is-enabled.js"),

	isTargetEnabled: require("./is-target-enabled.js"),

	logger: require("./logger.js"),

	loopItems: require("./loop-items.js"),

	onlyOneIfWasGet: require("./only-one-if-was-get.js"),

	ownerOrRestrict: require("./owner-or-restrict.js"),

	permissionsOrOwner: require("./permissions-or-owner.js"),

	preventDisabledAdmin: require("./prevent-disabled-admin.js"),

	sendVerificationEmail: require("./send-verification-email.js"),

	setDefaultRole: require("./set-default-role.js"),

	setFirstUserToRole: require("./set-first-user-to-role.js"),

	// end inject hooks
}
