<template>
  <renderless-numeric-condition :id="id">
    <base-condition
      :clauseOptions="{...$options.clauseOptions}"
      :value1="from || value"
      :value2="to"
    >
      <slot></slot>
    </base-condition>
  </renderless-numeric-condition>
</template>

<script>
 import BaseCondition from './base-condition';
 import { conditionProps } from './mixins';
 import { NumericCondition as RenderlessNumericCondition } from '@/components/renderless/conditions';
 import * as numericClauseOptions from '@/components/tailwind/clause-options/numeric';

 export default {
   name: 'numeric-condition',
   mixins: [conditionProps],
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
   clauseOptions: numericClauseOptions,
   components: {
     BaseCondition,
     RenderlessNumericCondition,
   },
 };
</script>
