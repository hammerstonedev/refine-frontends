<template>
  <renderless-text-condition :id="id" :display="display">
    <slot>
      <equals selected/>
    </slot>
  </renderless-text-condition>
</template>

<script>
 import {
   TextCondition as RenderlessTextCondition,
 } from '@/components/renderless/conditions';

 import {
   Equals,
 } from '@/components/tailwind/clauses/text';

 export default {
   name: 'text-condition',
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
   provide() {
     const { registerClause } = this;
     return { registerClause };
   },
   data() {
     const { selectedClause } = this;
     return {
       clauses: {},
       selectedClauseId: selectedClause,
     };
   },
   registerClause(clause) {
     const { id: clauseId } = clause;
     if (this.clauses[clauseId]) {
       throw new Error(`A clause with id ${clauseId} has already been registered for condition ${this.id}.`);
     }
     this.clauses[clauseId] = clause;
   },
   selectClause(clauseId) {
     this.selectedClauseId = clauseId;
   },
   selectedClause() {
     const { selectedClauseId, clauses } = this;
     const firstClauseId = Object.keys[0];
     return clauses[selectedClauseId] || clauses[firstClauseId];
   },
   components: {
     RenderlessTextCondition,
     Equals,
   },
 };
</script>
