<template>
  <input type="text" :value="value" @input="setValue($event.target.value)" />
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
