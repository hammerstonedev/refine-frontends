<template>
  <equals v-if="isSelected" v-slot="{ setValue, value }">
    <input type="text" :value="value" @input="setValue($event.target.value)" />
  </equals>
</template>

<script>
 import clauses from '@/components/renderless/clauses/text';

 const { Equals } = clauses;

 export default {
   inject: ['clauseSelector'],
   props: {
     selected: {
       type: Boolean,
       required: false,
       default: false,
     },
   },
   components: {
     Equals,
   },
   computed: {
     isSelected: function() {
       const { selectedClauseId } = this.clauseSelector;
       return selectedClauseId === 'eq';
     },
   },
   created() {
     this.clauseSelector.registerClause({id: 'eq', display: 'equals'});
     if (this.selected) {
       this.clauseSelector.selectClause('eq');
     }
   },
 };
</script>
