<template lang="jade">
	.page.toolbar-fixed
		f7-navbar(sliding='')
			f7-nav-center Feathers-Vue
			f7-nav-right
				f7-link(icon='icon-bars', open-panel='left')

		f7-messagebar(ref="messageBar", placeholder='Message', send-link='Send', @submit='sendMessage')
	
		.page-content.messages-content
			.messages

				.message.message-with-avatar(
					:class="{'message-sent': m.user._id === auth.currentUser._id, 'message-received': m.user._id !== auth.currentUser._id }", 
					v-for="m in messages",
					@click="showTime(m)"
				)
					// Sender name
					.message-name {{m.user.name || m.user.email}}
					// Bubble with text
					.message-text {{m.text}}
					// Sender avatar
					.message-avatar(:style="{'background-color': m.user.color}")
						.initials {{m.user.initials}}

					.messages-date(v-show="m.showTime")
						| {{m.updatedAt | moment('dddd')}} 
						span  {{m.updatedAt | moment('h:mmA')}}
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
		myMessages: {},
		newMessageText: '',
		errorsSummary: '',
		messagesLength: 0
	}),
	store: ['auth', 'messages'],

	created: async function() {
		if(auth.currentUser) {
			let [err, result] = await api.messages.find({})
			if(!err) {
				result.forEach(m => {
					m.showTime = false
				})
				this.$store.messages = result
				this.messagesLength = result.length
			}

			this.myMessages = this.$f7.messages('.messages', {
			    scrollMessagesOnlyOnEdge: true,
			    scrollMessages: true
			})
			
			Vue.nextTick(() => {
				this.myMessages.scrollMessages()
			})
		}			
	},
	watch: {
		messages: function(currentMessages) {
			if(Object.keys(currentMessages).length > this.messagesLength) {
				this.messagesLength = Object.keys(currentMessages).length
				Vue.nextTick(() => {
					this.myMessages.scrollMessages()
				})
			}
		}
	},
	methods: {
		showTime: function(selected) {
			_.forOwn(this.$store.messages, m => {
				if(m !== selected)
				m.showTime = false
			})
			selected.showTime = !selected.showTime
		},
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
				if(!err) {
					this.$refs.messageBar.clear()
				}
			} else {
				this.errorsSummary = _.map(data.errors, err => err).join('<br>')
				notify.error(this.errorsSummary)
			}

		}
	}
}
</script>

<style lang="stylus">
	.message-text 
		padding: 1em
		font-size: 1.2em
		line-height: 1.4em
	.message-sent
		.message-text
			background-color: white
		.message-text:before
			border-bottom-color: white
	.message-name
		margin-bottom 6px
		font-size 15px
		font-weight bold
		text-align left
		
	.initials
		position absolute
		font-size 1.2em
		color white
		top 50%
		left 50%
		-webkit-transform translate(-50%, -50%)
		transform translate(-50%, -50%)
		
	.messages-date
		font-size 13px
</style>
