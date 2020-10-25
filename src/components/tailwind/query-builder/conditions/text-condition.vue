<template>
  <text-condition :id="id">
    <clause-selector>
      <slot>
        <equals />
        <does-not-equal selected />
      </slot>
    </clause-selector>
  </text-condition>
</template>

<script>
 import { TextCondition } from '@/components/renderless/conditions';

 import { Equals, DoesNotEqual } from '@/components/tailwind/clauses/text';

 import ClauseSelector from '@/components/tailwind/query-builder/clause-selector';

 export default {
   props: {
     id: {
       type: String,
       required: true,
     },
     selectedClause: {
       type: Number,
       required: false,
     },
   },
   components: {
     TextCondition,
     Equals,
     DoesNotEqual,
     ClauseSelector,
   },
 };
</script>
