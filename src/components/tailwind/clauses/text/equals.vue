<template>
  <equals v-slot="{ setValue, value }">
    <input type="text" :value="value" @input="setValue($event.target.value)" />
  </equals>
</template>

<script>
 import clauses from '@/components/renderless/clauses/text';

 const { Equals } = clauses;

 export default {
   props: {
     selected: {
       type: Boolean,
       default: false,
     },
   },
   components: {
     Equals,
   },
 };
</script>
