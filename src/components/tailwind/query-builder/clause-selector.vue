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
 export default {
   name: 'clause-selector',
   provide() {
     return {
       registerClause: this.registerClause,
       clauseSelector: this.clauseSelector,
     }
   },
   data() {
     return {
       clauseSelector: {
         clauses: {},
         selectedClauseId: '',
       },
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
       const { clauses } = this.clauseSelector;
       this.clauseSelector.clauses = {
         ...clauses,
         [clauseId]: clause,
       };
     },
     selectClause(clauseId) {
       this.clauseSelector.selectedClauseId = clauseId;
     },
   },
 }
</script>
