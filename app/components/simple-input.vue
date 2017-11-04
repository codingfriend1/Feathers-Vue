<template lang="pug">
.form-group(:class="{'has-error': error, 'has-success': !error }")
  label(:for='randomId', v-once='', v-if='label') {{label}}
  .input-group(v-if='addon', v-once='')
    .input-group-addon(v-html='addon')
    input.form-control(:id='randomId', type='text', v-once='', @input="$emit('input', $event.target.value)", :name='label', :type='safeType', :placeholder='label', @keyup="$emit('keyup', $event)", @keydown="$emit('keydown', $event)")
  input.form-control(v-if='!addon', :id='randomId', type='text', v-once='', @input="$emit('input', $event.target.value)", :name='label', :type='safeType', :placeholder='label', @keyup="$emit('keyup', $event)", @keydown="$emit('keydown', $event)")
  .help-block.with-errors {{error}}
</template>

<script>
module.exports = {
  props: ['value', 'label', 'error', 'type', 'addon'],
  data: function() {
    return {
      randomId: 'simple-input-' + Math.random() * Math.random(),
      safeType: 'text'
    }
  },
  beforeMount: function() {
    this.safeType = this.type || 'text'
  }
}
</script>
