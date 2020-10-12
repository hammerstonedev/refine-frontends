<template>
  <equals :value="value" v-slot="{ setValue }">
    <input type="text" value="value" @input="setValue($event.target.value)" />
  </equals>
</template>

<script>
 import clauses from '@/components/renderless/clauses/text';

 const { Equals } = clauses;

 export default {
   name: 'text-equals',
   props: {
     value: {
       required: true,
       type: String,
     },
   },
   components: {
     Equals,
   },
 };
</script>
