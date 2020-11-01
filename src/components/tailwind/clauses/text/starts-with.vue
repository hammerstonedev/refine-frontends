<template>
  <starts-with :value="initialValue" v-if="isSelected" v-slot="{ setValue, value }">
    <input type="text" :value="value" @input="setValue($event.target.value)" />
  </starts-with>
</template>

<script>
 import clauses from '@/components/renderless/clauses/text';

 const { StartsWith } = clauses;

 export default {
   inject: ['clauseSelector'],
   props: {
     selected: {
       type: Boolean,
       required: false,
       default: false,
     },
     initialValue: {
       type: String,
       required: false,
     },
   },
   components: {
     StartsWith,
   },
   computed: {
     isSelected: function() {
       const { selectedClauseId } = this.clauseSelector;
       return selectedClauseId === 'sw';
     },
   },
   created() {
     if (this.initialValue && !this.selected) {
       throw new Error('You can only set the intial value for a clause that is selected by default.');
     }

     this.clauseSelector.registerClause({id: 'sw', display: 'Starts with'});
     if (this.selected) {
       this.clauseSelector.selectClause('sw');
     }
   },
 };
</script>
