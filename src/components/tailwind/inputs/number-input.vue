<template>
  <input
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
 export default {
   props: {
     value: {
       type: Number,
       required: false,
     },
   },
 };
</script>
