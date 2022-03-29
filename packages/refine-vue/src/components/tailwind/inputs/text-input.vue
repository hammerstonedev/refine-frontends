<template>
  <input
    class="refine-text-input"
    type="text"
    :value="value"
    @input="$emit('input', { value: $event.target.value })"
  />
</template>

<script>
export default {
  name: 'refine-text-input',
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>
