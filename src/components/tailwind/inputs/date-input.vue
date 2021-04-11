<template>
  <div>
    <date-picker
      @input="handleChange"
      v-model="time"
      valueType="YYYY-MM-DD"
    >
      <template v-slot:input>
        <div>
          <input
            type="text"
            name="date"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            :value="time"
          />
        </div>
      </template>
      <template v-slot:icon-calendar>
        <svg
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
      </template>
    </date-picker>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: { DatePicker },
  data() {
    return {
      time: null,
    };
  },
  methods: {
    handleChange: function () {
      this.$emit("input", { value: this.time });
    },
  },
};
</script>

