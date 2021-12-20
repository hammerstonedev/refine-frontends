<template>
  <div class="refine-double-date-wrapper">
    <date-picker :date="date1" @input="updateFirstDate" v-bind="$attrs" />
    <p class='refine-double-date-joiner' v-if='joinWord'>{{ joinWord }}</p>
    <date-picker :date="date2" @input="updateSecondDate" />
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
    meta: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    joinWord() {
      // @TODO Meta helper
      return Object.prototype.hasOwnProperty.call(this.meta, 'joiner') ? this.meta.joiner : 'and';
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
