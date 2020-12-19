<template>
  <div>
    <select
      @input="selectClause($event.target.value)"
    >
      <option
        v-for="clause in clauses"
        :key="clause.id"
        :value="clause.id"
        :selected="selectedClauseId && (clause.id === selectedClauseId)"
      >
        {{ clause.display }}
      </option>
    </select>
    <slot></slot>
  </div>
</template>

<script>
 import Vue from 'vue';
 import ClauseSelector from '@/stores/clause-selector';

 export default {
   name: 'clause-selector',
   provide() {
     return {
       clauseSelector: this.clauseSelector,
     }
   },
   inject: ['condition'],
   data() {
     const { condition } = this;
     return {
       clauseSelector: Vue.observable(new ClauseSelector(condition.id)),
     };
   },
   computed: {
     selectedClauseId: function() {
       const { selectedClauseId } = this.clauseSelector;
       return selectedClauseId;
     },
     clauses: function() {
       const { clauses } = this.clauseSelector;
       return Object.values(clauses);
     },
   },
   methods: {
     selectClause(clauseId) {
       this.clauseSelector.selectedClauseId = clauseId;
     },
   },
 }
</script>
