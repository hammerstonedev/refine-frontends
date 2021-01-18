<template>
  <renderless-text-condition :id="id">
    <base-condition
      :conditionId="id"
      :clauseOptions="clauseOptions"
      :value="value"
    >
      <slot></slot>
    </base-condition>
  </renderless-text-condition>
</template>

<script>
 import BaseCondition from './base-condition';
 import { conditionProps } from './mixins';
 import { TextCondition as RenderlessTextCondition } from '@/components/renderless/conditions';
 import * as textClauseOptions from '@/components/tailwind/clause-options/text';

 export default {
   name: 'text-condition',
   mixins: [conditionProps],
   props: {
     value: {
       type: String,
       required: false,
     },
   },
   computed: {
     clauseOptions() {
       if (this.meta && this.meta.clauses) {
         return this.meta.clauses.reduce((clauses, clause) => {
           return {
             [`${clause.component}Option`]: textClauseOptions[`${clause.component}Option`],
             ...clauses,
           };
         }, {});
       }
       console.log({...textClauseOptions});
       return {...textClauseOptions};
     }
   },
   components: {
     BaseCondition,
     RenderlessTextCondition,
   },
 };
</script>
