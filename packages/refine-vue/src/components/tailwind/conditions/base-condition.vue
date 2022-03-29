<template>
  <selector>
    <slot>
      <component
        v-for="(clauseOption, key, index) in clauseOptions"
        :is="clauseOption"
        :key="key"
        :selected="index === 0"
        v-bind="$attrs"
      />
    </slot>
  </selector>
</template>

<script>
 import Selector from '../../../components/tailwind/selector';

 export default {
   name: 'base-condition',
   components: {
     Selector,
   },
   data() {
     let clauseOptions = {};
     if (this.clauses) {
       this.clauses.forEach((clauseName) => {
         clauseOptions[clauseName] = this.defaultClauseOptions[`${clauseName}Option`];
       });
     } else {
       clauseOptions = { ...this.defaultClauseOptions };
     }

     return {
       clauseOptions,
     };
   },
   props: {
     defaultClauseOptions: {
       type: Object,
       required: true,
     },
     clauses: {
       type: Array,
       required: false,
       default: () => { return []; },
     },
   },
 };
</script>
