import Vue from 'vue'

export default Vue.component('confirm', {
  template: `
    <div class="confirm-dialogue">
      <div class="confirm-dialogue-header">
        <h3 class="absolute-center no-margin">Are you sure?</h3>
      </div>
      <div class="confirm-dialogue-body text-center">

        <p class="no-margin">{{question}}</p>
      </div>
      <div className="confirm-dialogue-footer">
        <div class="six m-6">
          <div class="margin-all-around">
            <button class="btn btn-warning btn-block" @click="answer(false)"">No</button>
          </div>
        </div>
        <div class="six m-6">
          <div class="margin-all-around">
            <button class="btn btn-success btn-block" @click="answer(true)"">Yes</button>
          </div>
        </div>
      </div>


    </div>
  `,
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
})
