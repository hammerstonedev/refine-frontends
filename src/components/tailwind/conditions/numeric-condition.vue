<template>
  <renderless-numeric-condition
    :id="id || condition.id"
    :condition="condition"
    v-slot="{ clauses }"
  >
    <base-condition
      :clauses="clauses"
      :defaultClauseOptions="$options.defaultClauseOptions"
      :to="to"
      :from="from || value"
      :value="value || to"
    >
      <slot></slot>
    </base-condition>
  </renderless-numeric-condition>
</template>

<script>
 import BaseCondition from './base-condition';
 import { conditionProps } from '@/mixins';
 import { NumericCondition as RenderlessNumericCondition } from '@/components/renderless/conditions';
 import * as numericClauseOptions from '@/components/tailwind/clause-options/numeric';

 export default {
   name: 'numeric-condition',
   mixins: [conditionProps],
   defaultClauseOptions: {...numericClauseOptions},
   props: {
     value: {
       type: Number,
       required: false,
     },
     from: {
       type: Number,
       required: false,
     },
     to: {
       type: Number,
       required: false,
     }
   },
   components: {
     BaseCondition,
     RenderlessNumericCondition,
   },
 };
</script>
