<template>
  <selector @select-option="selectOption">
    <slot> </slot>
  </selector>
</template>

<script>
import Selector from '../../../components/base/selector';

export default {
  name: 'condition-selector',
  emits: ['select-condition'],
  methods: {
    selectOption(nextOption) {
      this.$emit('select-condition', nextOption);
    },
  },
  components: {
    Selector,
  },
};
</script>
