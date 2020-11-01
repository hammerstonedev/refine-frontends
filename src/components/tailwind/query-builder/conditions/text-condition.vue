<template>
  <text-condition :id="id">
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
  </text-condition>
</template>

<script>
 import { TextCondition } from '@/components/renderless/conditions';

 import * as defaultClauses from '@/components/tailwind/clauses/text';

 import ClauseSelector from '@/components/tailwind/query-builder/clause-selector';

 export default {
   props: {
     id: {
       type: String,
       required: true,
     },
     initialValue: {
       type: String,
       required: false,
     },
   },
   data() {
     return {
       defaultClauses,
     };
   },
   components: {
     TextCondition,
     ClauseSelector,
     ...defaultClauses,
   },
 };
</script>
