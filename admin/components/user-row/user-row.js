const Vue = require('vue')

module.exports = Vue.component('user-row', {
  props: ['user'],
  store: ['roles', 'currentUser', 'currentModal'],
  data: () => ({
    showDetails: false
  }),
  template: require('./user-row.jade'),
  methods: {
    changeUserRole: async function(user) {
      let [err, result] = await api.users.updateOne(user._id, { role: user.newRole })
      if(err) {
        notify.warning(parseErrors(err))
      } else {
        notify.success(`${user.name} is now ${a_or_an(user.newRole)} ${user.newRole} role`)
      }
    },
    changeIsEnabled: async function(user) {
      const isEnabled = user.newIsEnabled

      let [err, result] = await api.users.updateOne(user._id, { isEnabled })

      if(err) {
        notify.debug("Error enabling/disabling user", err);
        notify.warning(parseErrors(err))
      } else {
        notify.success(`${user.name}'s is now ${user.newIsEnabled? 'enabled': 'disabled'}`)
      }
    },
    removeUser: async function(user) {
      let answer = await confirm(`Do you want to delete ${user.name || user.email}?`)

      if(answer) {
        let [err, result] = await api.users.deleteOne(user._id)
        if(!err) {
          notify.success(`${user.name} was deleted.`)
        } else {
          notify.warning(`Could not delete ${user.name}.`)
        }
      }
    }
  },
  beforeMount: function() {
    this.user.newRole = this.user.role
  },
  computed: {
    modifiedUser: function() {
      return Object.assign(this.user, {newRole: this.user.role, newIsEnabled: this.user.isEnabled})
    },
    initials: function() {
      return this.user.name.match(/\b(\w)/g).join('')
    },
  }
})
