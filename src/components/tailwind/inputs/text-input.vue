<template>
  <input
    class="text-input"
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
 export default {
   props: {
     value: {
       type: String,
       required: true,
     },
   },
 };
</script>
