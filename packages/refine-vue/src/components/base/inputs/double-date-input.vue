<template>
  <refine-flavor as='div' component='inputs.date.double.wrapper'>
    <refine-flavor
      as='refine-date-picker'
      component='inputs.date'
      v-bind='$attrs'
      :date='date1'
      @input='e => $emit("input", { date1: e.value })'
    />
    <refine-flavor as='p' component='inputs.date.double.joiner'>{{ joiner }}</refine-flavor>
    <refine-flavor
      as='refine-date-picker'
      component='inputs.date'
      v-bind='$attrs'
      :date='date2'
      @input='e => $emit("input", { date2: e.value })'
    />
  </refine-flavor>
</template>

<script>
import { RefineFlavor } from '../query-builder/refine-flavor';

export default {
  name: 'refine-double-date-input',
  components: {
    RefineFlavor,
  },
  emits: ['input'],
  props: {
    date1: {
      type: String,
      required: false,
    },
    date2: {
      type: String,
      required: false,
    },
    joiner: {
      type: String,
      required: false,
      default: 'and',
    },
  },
};
</script>
