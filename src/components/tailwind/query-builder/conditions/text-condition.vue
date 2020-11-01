<template>
  <condition :condition="TextCondition" :defaultClauses="defaultClauses" :initialValue="initialValue" :id="id" />
</template>

<script>
 import { TextCondition } from '@/components/renderless/conditions';

 import * as defaultClauses from '@/components/tailwind/clauses/text';

import Condition from './condition';

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
       defaultClauses: { ...defaultClauses },
       TextCondition,
     };
   },
   components: {
     Condition,
     ...defaultClauses,
   },
 };
</script>
