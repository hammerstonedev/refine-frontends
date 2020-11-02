<template>
  <equals :value="value" v-if="isSelected" v-slot="{ setValue, value }">
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
     value: {
       type: String,
       required: false,
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
     if (this.value && !this.selected) {
       throw new Error('You can only set the intial value for a clause that is selected by default.');
     }

     this.clauseSelector.registerClause({id: 'eq', display: 'equals'});
     if (this.selected) {
       this.clauseSelector.selectClause('eq');
     }
   },
 };
</script>
