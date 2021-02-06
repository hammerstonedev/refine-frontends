<template>
  <div>
    <number-input
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
 export default {
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
         this.$emit('input', newValue)
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
