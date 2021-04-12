<template>
  <div class="flex align-items">
    <date-picker :date="date1" @input="updateFirstDate" />
    <p class="px-3 self-center">and</p>
    <date-picker :date="date2" @input="updateSecondDate" />
  </div>
</template>

<script>
import DatePicker from "./date-picker";

export default {
  methods: {
    updateFirstDate: function ({ date }) {
      this.$emit("input", { date1: date });
    },
    updateSecondDate: function ({ date }) {
      this.$emit("input", { date2: date });
    },
  },
  props: {
    date1: {
      type: Number,
      required: false,
    },
    date2: {
      type: Number,
      required: false,
    },
  },
  components: {
    DatePicker,
  },
};
</script>
