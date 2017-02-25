import Vue from 'vue'

export default Vue.component('modal', {
  name: 'modal',
  template: require('./modal.jade'),
  store: ['currentModal', 'modalConfig'],
  methods: {
    close: function () {
      this.currentModal = undefined
      radio.$emit('modalClosed')
    }
  },
  mounted: function () {
    // When escape key is pressed close the modal
    document.addEventListener("keydown", (e) => {
      if (this.currentModal && e.keyCode == 27) {
        this.currentModal = undefined
        radio.$emit('modalClosed')
      }
    })
  }
})
