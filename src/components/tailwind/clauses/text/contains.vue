<template>
  <contains :value="value" v-if="isSelected" v-slot="{ setValue, value }">
    <input type="text" :value="value" @input="setValue($event.target.value)" />
  </contains>
</template>

<script>
 import clauses from '@/components/renderless/clauses/text';

 const { Contains } = clauses;

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
     Contains,
   },
   computed: {
     isSelected: function() {
       const { selectedClauseId } = this.clauseSelector;
       return selectedClauseId === 'cont';
     },
   },
   created() {
     if (this.value && !this.selected) {
       throw new Error('You can only set the intial value for a clause that is selected by default.');
     }

     this.clauseSelector.registerClause({id: 'cont', display: 'Contains'});
     if (this.selected) {
       this.clauseSelector.selectClause('cont');
     }
   },
 };
</script>
