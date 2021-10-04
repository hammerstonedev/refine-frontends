<template>
  <div class="flex align-items">
    <number-input
      class="mr-3"
      :value="currentValue"
      @input="updateFirstValue"
    />
    <number-input
      :value="currentValue"
      @input="updateSecondValue"
    />
  </div>
</template>

<script>
 import NumberInput from './number-input';

 export default {
   data() {
     return {
       currentValue: this.value,
     };
   },
   methods: {
     updateFirstValue: function({ value }) {
       this.$emit('input', { value1: value })
     },
     updateSecondValue: function({ value }) {
       this.$emit('input', { value2: value })
     },
   },
   props: {
     value1: {
       type: String,
       required: false,
     },
     value2: {
       type: String,
       required: false,
     },
   },
   components: {
     NumberInput,
   },
 };
</script>
