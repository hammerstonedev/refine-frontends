<template>
  <div>
    <selector>
      <slot></slot>
    </selector>
  </div>
</template>

<script>
 import Vue from 'vue';
 import ClauseSelector from '@/stores/clause-selector';
 import Selector from './selector';

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
     options: function() {
       const { clauses } = this.clauseSelector;
       return Object.values(clauses);
     },
   },
   components: {
     Selector,
   },
 }
</script>
