<template>
  <component :is="DatePicker"
    v-model:value="time"
    value-type="YYYY-MM-DD"
    :format="format"
    v-bind="$attrs"
    @input="handleInput"
    @change="handleInput"
    @input-error="handleInputError"
    :input-class="hasError ? inputClass + errorClass : inputClass"
  >
    <template v-slot:icon-calendar>
      <svg
        v-if="!hasError"
        xmlns="http://www.w3.org/2000/svg"
        class="refine-date-input-calendar-icon"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        v-if="hasError"
        class="refine-date-input-error-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </template>
  </component>
</template>

<script>
export default {
  inject: ['DatePicker'],
  props: {
    date: {
      type: String,
      required: false,
    },
    // This is the format that is displayed to the end user, it
    // has nothing to do with the format that ends up in the
    // blueprint. The blueprint format is hardcoded in the
    // template above, under the `value-type` key.
    format: {
      type: String,
      required: false,
      default: 'MM/DD/YYYY',
    },
  },
  data() {
    const { date } = this;
    return {
      time: date,
      hasError: false,
      inputClass: "refine-date-input",
      errorClass: "refine-date-input-error",
    };
  },
  methods: {
    handleInputError: function () {
      this.hasError = true;
    },
    handleInput: function (...args) {
      console.log(args);
      this.hasError = false;
      this.$emit("input", { date: this.time });
    },
  },
};
</script>