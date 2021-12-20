<template>
  <div class="refine-double-date-wrapper">
    <date-picker :date="date1" @input="updateFirstDate" v-bind="$attrs" />
    <p class='refine-double-date-joiner'>{{ joiner }}</p>
    <date-picker :date="date2" @input="updateSecondDate" v-bind="$attrs" />
  </div>
</template>

<script>
import DatePicker from "./date-picker";

export default {
  components: {
    DatePicker,
  },
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
      default: 'and'
    }
  },
  methods: {
    updateFirstDate: function ({ date }) {
      this.$emit("input", { date1: date });
    },
    updateSecondDate: function ({ date }) {
      this.$emit("input", { date2: date });
    },
  },
};
</script>
