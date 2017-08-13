<template lang="jade">
	.row
		.col-lg-8.col-lg-offset-2.col-md-10.col-md-offset-1
			p
				| Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!
			h3 Super Duper Messages
			ul
				li(v-for="m in messages")
					div {{m.text}}
					simpleInput(
						v-model="m.textChanges",
						@keyup.enter="updateMessage(m)",
						:error="m.errors? m.errors.text: ''"
					)
					button.btn.btn-warning(@click="updateMessage(m)") Update
					button.btn.btn-danger(@click="api.messages.deleteOne(m._id)") Delete
			simpleInput(
				label="Message",
				v-model="newMessage.text",
				:error="newMessage.errors.text",
				@keyup.enter="sendMessage(newMessage)",
				@keydown="validateLive(newMessage, 'message', 'text')"
			)
			.alert.alert-danger(v-show="errorsSummary" v-html="errorsSummary")
			button.btn.btn-success(@click="sendMessage(newMessage)") Add Message

</template>

<script>

// const feathers = require('../services/api/feathers.service')
const _ = require('lodash')
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
	store: ['message', 'auth', 'currentModal', 'messages', 'api', 'validateLive'],

	// beforeCreate and create are both run on the server before the html is sent. The api library used, "axios", is isomorphic so it works both on client and server
	created: async function() {
		// if(this.$isServer) {
			let [err, result] = await api.messages.find({})
			console.log('result', result);
			if(!err) {
				this.$store.messages = result.data
			}		
		// }
	},
	metaInfo: {
		title: 'Home',
	},
	methods: {
		updateMessage: async function(m) {
			let mes = _.cloneDeep(m)
			mes.text = mes.textChanges

			let valid = await checkValid(mes, 'message')
			if(valid) {
				let [err, message] = await api.messages.upsert(mes)
        if(err) { notify.error(parseErrors(err)); }
			} else {
				Vue.set(m, 'errors', mes.errors)
			}
		},

		sendMessage: async function(data) {
      if(!_.get(this, 'auth.currentUser._id')) {
        this.errorsSummary = "You must be logged in."
        return false;
      }

      data.userId = _.get(this, 'auth.currentUser._id');

			let valid = await checkValid(data, 'message')

			if(valid) {
				this.errorsSummary = ''
				var [err, success] = await api.messages.upsert(data)
			} else {
				this.errorsSummary = _.map(data.errors, err => err).join('<br>')
			}

		}
	}
}
</script>

<style lang="stylus">
	
</style>
