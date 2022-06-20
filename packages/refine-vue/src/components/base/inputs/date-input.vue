<template>
  <date-picker @input="handleInput" :date="date1" v-bind="$attrs" />
</template>

<script>
import DatePicker from './date-picker';

export default {
  name: 'refine-date-input',
  props: {
    date1: {
      type: String,
      required: false,
    },
  },
  emits: ['input'],
  components: {
    DatePicker,
  },
  methods: {
    handleInput: function ({ date }) {
      this.$emit('input', { date1: date });
    },
  },
};
</script>
