<template>
  <refine-flavor
    as="input"
    component="inputs.text"
    type="text"
    :value="value"
    @input="$emit('input', { value: $event.target.value })"
  />
</template>

<script>
import { RefineFlavor } from '../query-builder/refine-flavor';
export default {
  name: 'refine-text-input',
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  components: {
    RefineFlavor,
  },
};
</script>
