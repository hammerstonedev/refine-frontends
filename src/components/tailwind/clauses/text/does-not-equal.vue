<template>
  <does-not-equal v-if="isSelected" :value="value" v-slot="{ setValue, value }">
    <input type="text" :value="value" @input="setValue($event.target.value)" />
  </does-not-equal>
</template>

<script>
 import clauses from '@/components/renderless/clauses/text';

 const { DoesNotEqual } = clauses;

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
     DoesNotEqual,
   },
   computed: {
     isSelected: function() {
       const { selectedClauseId } = this.clauseSelector;
       return selectedClauseId === 'dne';
     },
   },
   created() {
     this.registerClause({id: 'dne', display: 'Does not equal'});
   },
 };
</script>
