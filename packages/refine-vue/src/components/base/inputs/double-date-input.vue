<template>
  <refine-flavor as="div" component="inputs.date.double.wrapper">
    <date-picker :date="date1" @input="updateFirstDate" v-bind="$attrs" />
    <refine-flavor as="p" component="inputs.date.double.joiner">{{ joiner }}</refine-flavor>
    <date-picker :date="date2" @input="updateSecondDate" v-bind="$attrs" />
  </refine-flavor>
</template>

<script>
import { RefineFlavor } from '../query-builder/refine-flavor';
import DatePicker from './date-picker';

export default {
  name: 'refine-double-date-input',
  components: {
    DatePicker,
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
  methods: {
    updateFirstDate: function ({ date }) {
      this.$emit('input', { date1: date });
    },
    updateSecondDate: function ({ date }) {
      this.$emit('input', { date2: date });
    },
  },
};
</script>
