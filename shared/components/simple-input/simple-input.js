import Vue from 'vue'

Vue.component('simple-input', {
  template: `
    <div class="form-group" :class="{'has-error': error, 'has-success': !error }">
      <label :for="randomId" v-once v-if="label">{{label}}</label>
      <div class="input-group" v-if="addon" v-once>
        <div class="input-group-addon" v-html="addon"></div>
        <input
          :id="randomId"
          type="text"
          class="form-control"
          v-once
          @input="$emit('input', $event.target.value)"
          :name="label" :type="type"
          :placeholder="label"
          @keyup="$emit('keyup', $event)"
          @keydown="$emit('keydown', $event)">
      </div>

      <input
        v-if="!addon"
        :id="randomId"
        type="text"
        class="form-control"
        v-once
        @input="$emit('input', $event.target.value)"
        :name="label" :type="type"
        :placeholder="label"
        @keyup="$emit('keyup', $event)"
        @keydown="$emit('keydown', $event)">
      <div class="help-block with-errors">{{error}}</div>
    </div>
  `,
  props: ['value', 'label', 'error', 'type', 'addon'],
  data: function() {
    return {
      randomId: 'simple-input-' + Math.random() * Math.random()
    }
  },
  beforeCreate: function() {
    this.type = this.type || 'text'
  }
})
