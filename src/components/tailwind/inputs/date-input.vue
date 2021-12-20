<template>
  <date-picker :date="date" @input="handleInput" v-bind="$attrs" />
</template>

<script>
import DatePicker from "./date-picker";

export default {
  props: {
    date: {
      type: String,
      required: false,
    },
  },
  components: {
      DatePicker,
  },
  methods: {
    handleInput: function ({ date }) {
      this.$emit("input", { date });
    },
  },
};
</script>

