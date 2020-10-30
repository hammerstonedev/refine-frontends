<template>
  <does-not-equal v-if="isSelected" :value="value" v-slot="{ setValue, value }">
    <input type="text" :value="value" @input="setValue($event.target.value)" />
  </does-not-equal>
</template>

<script>
 import clauses from '@/components/renderless/clauses/text';

 const { DoesNotEqual } = clauses;

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
     DoesNotEqual,
   },
   computed: {
     isSelected: function() {
       const { selectedClauseId } = this.clauseSelector;
       return selectedClauseId === 'dne';
     },
   },
   created() {
     if (this.selected) {
       this.clauseSelector.selectClause('eq');
     }
     this.clauseSelector.registerClause({id: 'dne', display: 'Does not equal'});
   },
 };
</script>
