<template lang="jade">
	div
		div.user-list(v-if="this.showUsers")
			user-row(v-for="user in users", :user="user")
		div.container(v-if="!this.showUsers")
			.alert.alert-warning There are either no users or you do not have permission to view them

</template>

<script>

module.exports = {
	store: ['message', 'currentUser', 'currentModal', 'users'],
	data: () => ({
		showUsers: false
	}),
	// beforeCreate and create are both run on the server before the html is sent. The api library used, "axios", is isomorphic so it works both on client and server
	beforeMount: async function() {
		if(!this.$isServer) {

			(async () => {
				let [err, result] = await api.users.find({})
				if(!err) {
					this.$store.users = _.keyBy(result.data, '_id')
					if(result.data.length) { this.showUsers = true }
				}
			})();

			(async () => {
				let [err, result] = await api.roles.find({})
				if(!err) {
					this.$store.roles = _.keyBy(result.data, '_id')
				}
			})()
		}
	},
	metaInfo: {
		title: 'Users and Roles',
	}
}
</script>

<style lang="stylus">
	.user-list
		padding 0.5em
</style>
