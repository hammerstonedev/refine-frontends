<template>
  <component :is="condition" :id="id">
    <clause-selector>
      <slot>
        <component
          v-for="(clause, key, index) in defaultClauses"
          :is="clause"
          :key="key"
          :initialValue="index === 0 ? initialValue : undefined"
          :selected="index === 0"
        />
      </slot>
    </clause-selector>
  </component>
</template>

<script>
 import ClauseSelector from '@/components/tailwind/query-builder/clause-selector';

 export default {
   props: {
     id: {
       type: String,
       required: true,
     },
     condition: {
       type: Object,
       required: true,
     },
     defaultClauses: {
       type: Object,
       required: true,
     },
     initialValue: {
       type: String,
       required: false,
     },
   },
   components: {
     ClauseSelector,
   },
 };
</script>
