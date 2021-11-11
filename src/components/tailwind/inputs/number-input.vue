<template>
  <input
    class="text-input"
    type="number"
    :value="currentValue"
    @input="handleInputChange"
  />
</template>

<script>
 export default {
   name: 'number-input',
   data() {
     return {
       currentValue: this.value,
     };
   },
   methods: {
     handleInputChange: function(event) {
       const inputValue = event.target.value;
       const newValue = Number(inputValue);

       if (isNaN(newValue)) {
         // don't emit. Only update with valid inputs so
         // the blueprint won't be updated with garbage and
         // we won't throw proptype errors
         this.currentValue = inputValue;
       } else {
         this.currentValue = newValue;
         this.$emit('input', { value: newValue })
       }

     },
   },
   props: {
     value: {
       type: Number,
       required: false,
     },
   },
 };
</script>
