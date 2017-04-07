<template lang="jade">
	#app(:class='routeClass').phone-view
		navigation
		heading
		.container
			router-view
		foot
		modal
</template>

<script>
module.exports = {
	methods: {

	},
	computed: {
		/**
		 * Get a class name based on the route path.
		 *
		 * @return {String}
		 */
		routeClass() {
			return this.$route.path.split('/').filter(part => Boolean(part)).join('-')
		}
	},
  beforeMount: function() {
    if(!this.$isServer) {
      this.$store.currentUser = auth.currentUser
      this.$store.api = api
      this.$store.validateLive = validateLive
      syncList('/api/messages', 'messages')
    }
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    // all titles will be injected into this template
    titleTemplate: '%s | Front-Vue',
		meta: [
			{ vmid: 'description', name: 'description', content: 'A boiler plate using jade, stylus, babel (es6, es7, es8), webpack, server side rendering, vue, docker, authentication'}
		]
  }
}
</script>
