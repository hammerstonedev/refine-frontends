<template>
  <input
    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
