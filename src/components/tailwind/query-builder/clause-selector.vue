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

 export default {
   name: 'clause-selector',
   provide() {
     return Vue.observable({
       registerClause: this.registerClause,
       selectedClauseId: this.selectedClauseId,
     });
   },
   data() {
     return {
       clauses: {},
       selectedClauseId: null,
     };
   },
   props: {
     initialValue: {
       required: false,
       type: String,
       default: '',
     },
   },
   methods: {
     registerClause(clause) {
       const { id: clauseId } = clause;
       if (this.clauses[clauseId]) {
         throw new Error(`A clause with id ${clauseId} has already been registered for condition ${this.id}.`);
       }
       this.clauses = {
         ...this.clauses,
         [clauseId]: clause,
       };
     },
     selectClause(clauseId) {
       this.selectedClauseId = clauseId;
     },
   },
 }
</script>
