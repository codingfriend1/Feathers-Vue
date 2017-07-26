<template lang="jade">
	f7-page.toolbar-fixed
		f7-navbar(sliding='')
			f7-nav-center Feathers-Vue
			f7-nav-right
				f7-link(icon='icon-bars', open-panel='left')

		f7-messages

			f7-message(
				:class="{'message-sent': m.user._id === auth.currentUser._id, 'message-received': m.user._id !== auth.currentUser._id }", 

				v-for="m in messages", 
				:name='m.user.name || m.user.email', 
				:text='m.text', 
				:time="m.updatedAt | moment('h:mmA')", 
				:day="m.updatedAt | moment('dddd')"
			)
			f7-messagebar(placeholder='Message', send-link='Send', @submit='sendMessage')

</template>

<script>

const Vue = require('vue')

module.exports = {
	data: () => ({
		newMessage: {
			text: '',
			userId: null,
			errors: {}
		},
		newMessageText: '',
		errorsSummary: ''
	}),
	store: ['auth', 'messages'],

	created: async function() {
			let [err, result] = await api.messages.find({})
			if(!err) {
				this.$store.messages = result
			}
	},
	methods: {
		updateMessage: async function(m) {
			let mes = _.cloneDeep(m)
			mes.text = mes.textChanges

			let valid = await checkValid(mes, 'message')

			if(valid) {
				let [err, message] = await api.messages.upsert(mes)
				if(err) { notify.error(parseErrors(err)) }
			} else {
				Vue.set(m, 'errors', mes.errors)
				notify.error(mes.errors.text)
			}
		},

		sendMessage: async function(message) {

			var data = {
				text: message
			}

			if(!_.get(this, 'auth.currentUser._id')) {
				this.errorsSummary = "You must be logged in."
				return false
			}

			data.userId = _.get(this, 'auth.currentUser._id')

			let valid = await checkValid(data, 'message')

			if(valid) {
				this.errorsSummary = ''
				var [err, success] = await api.messages.upsert(data)
			} else {
				this.errorsSummary = _.map(data.errors, err => err).join('<br>')
				notify.error(this.errorsSummary)
			}

		}
	}
}
</script>

<style lang="stylus">

</style>
