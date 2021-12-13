<template>
  <date-picker
    v-model="time"
    valueType="format"
    format="MM/DD/YYYY"
    @input="handleInput"
    @input-error="handleInputError"
    :input-class="hasError ? inputClass + errorClass : inputClass"
  >
    <template v-slot:icon-calendar>
      <svg
        v-if="!hasError"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-500"
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
        class="h-5 w-5 text-red-500"
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
  </date-picker>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import parse from "date-fns/parse";
import format from "date-fns/format";

export const formatPropDate = (date) => {
  return date
    ? format(parse(date, "yyyy-MM-dd", new Date()), "MM/dd/yyyy")
    : null;
};

export const formatPickerDate = (date) => {
  return format(parse(date, "MM/dd/yyyy", new Date()), "yyyy-MM-dd");
};

export default {
  components: { DatePicker },
  props: {
    date: {
      type: String,
      required: false,
    },
  },
  data() {
    const { date } = this;
    return {
      time: formatPropDate(date),
      hasError: false,
      inputClass:
        "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300 rounded-md py-2 px-3",
      errorClass:
        "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500",
    };
  },
  methods: {
    handleInputError: function () {
      this.hasError = true;
    },
    handleInput: function () {
      this.hasError = false;
      this.$emit("input", { date: formatPickerDate(this.time) });
    },
  },
};
</script>