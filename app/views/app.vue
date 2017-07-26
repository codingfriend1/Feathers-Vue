<template lang="jade">
	#app
		
		f7-statusbar

		// Right panel
		f7-panel(left='', cover='')
			f7-view#right-panel-view(navbar-through='', :dynamic-navbar='true', url='left-panel')

		// Main view
		f7-views#main-view(navbar-through='')
			f7-view(main='', url='/')


</template>

<script>
module.exports = {
	beforeMount: function() {
		
		this.$store.auth = auth
		this.$store.api = api

		this.$store.validateLive = validateLive
		syncList('/api/message', 'messages')
	}
}
</script>
