<template>
  <refine-flavor
    as='refine-date-picker'
    component='inputs.date'
    v-bind='$attrs'
    :date='date1'
    @input='e => $emit("input", { date1: e.value })'
  />
</template>

<script>
import { RefineFlavor } from '../query-builder/refine-flavor';

export default {
  name: 'refine-date-input',
  components: {
    RefineFlavor
  },
  emits: ['input'],
  props: {
    date1: {
      type: String,
      required: false,
    },
  },
};
</script>
