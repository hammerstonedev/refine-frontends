<template>
  <div class="flex-none sm:items-center sm:flex">
    <div>
    <input
      class="text-input"
      type="number"
      name="days"
      :value="days"
      @input="updateDays"
    />
    </div>
    <p class="py-3 sm:px-3 sm:py-0 sm:self-center">days</p>
    <selector @select-option="updateModifer" class="py-0">
      <selector-option
        id="ago"
        display="ago"
      />
      <selector-option
        id="from_now"
        display="from now"
      />
    </selector>
  </div>
</template>

<script>
import { Selector, SelectorOption } from "..";

export default {
  components: {
    Selector,
    SelectorOption,
  },
  created() {
    const { modifier } = this;
    this.$emit('input', { modifier });
  },
  methods: {
    updateModifer: function (nextOption) {
      this.$emit('input', { modifier: nextOption.id })
    },
    updateDays: function (event) {
      const days = event.target.value;
      this.$emit('input', { days });
    },
  },
  props: {
    modifier: {
      type: String,
      required: false,
      default: "ago",
    },
    days: {
      type: Number,
      required: false,
    },
  },
};
</script>
