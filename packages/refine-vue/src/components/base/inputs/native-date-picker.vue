<template>
  <refine-flavor
    as='input'
    component='inputs.date'
    type='date'
    :value='date'
    @input='handleInput'
  />
</template>

<script>
import { RefineFlavor } from '../query-builder/refine-flavor';

export default {
  emits: ['input'],
  components: {
    RefineFlavor,
  },
  props: {
    date: {
      type: String,
      required: false,
    },
  },
  methods: {
    handleInput: function(event) {
      this.$emit('input', {
        value: event?.target?.value ?? event,
      });
    },
  },
};
</script>
