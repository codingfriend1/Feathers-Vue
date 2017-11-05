<template lang="pug">
.confirm-dialogue
  .confirm-dialogue-header
    h3.absolute-center.no-margin Are you sure?
  .confirm-dialogue-body.text-center
    p.no-margin {{question}}
  div(classname='confirm-dialogue-footer')
    .six.m-6
      .margin-all-around
        button.btn.btn-warning.btn-block(@click='answer(false)') No
    .six.m-6
      .margin-all-around
        button.btn.btn-success.btn-block(@click='answer(true)') Yes

</template>

<script>
module.exports = {
  store: ['currentModal', 'modalConfig'],
  data: () => ({
    question: ''
  }),
  beforeMount: function() {
    this.question = this.modalConfig.message

    radio.$on('modalClosed', () => {
      this.modalConfig.answer(false)
      this.modalConfig = {}
    })
  },
  methods: {
    answer: function(reply) {
      this.modalConfig.answer(reply)
      this.currentModal = undefined
      this.modalConfig = {}
    }
  }
}
</script>

<style lang="stylus">
  .confirm-dialogue
    .confirm-dialogue-header
      position relative
      height 80px
      background-color: #ECF0F1
      color: #2C3E50

      i
        font-size 2em
    .confirm-dialogue-body
      padding 1em
</style>
