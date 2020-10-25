<template>
  <equals v-if="isSelected" :value="value" v-slot="{ setValue, value }">
    <input type="text" :value="value" @input="setValue($event.target.value)" />
  </equals>
</template>

<script>
 import clauses from '@/components/renderless/clauses/text';

 const { Equals } = clauses;

 export default {
   inject: ['clauseSelector', 'registerClause'],
   props: {
     value: {
       type: String,
       required: false,
       default: '',
     },
     selected: {
       type: Boolean,
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
     this.registerClause({id: 'eq', display: 'equals'});
   },
 };
</script>
