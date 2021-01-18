<template>
  <query>
    <condition-selector
      v-for="(selectedCondition, key) in selectedConditions"
      :key="key"
    >
      <component
        v-for="({component, id, display, meta}, key) in conditionOptions"
        :is="component"
        :selected="selectedCondition.conditionId == id"
        :id="id"
        :display="display"
        :key="key"
        :meta="meta"
      />
    </condition-selector>
  </query>
</template>

<script>
 import { Query, ConditionSelector } from '.';
 import Blueprint from '@/stores/blueprint';
 import * as conditionOptions from './condition-options';
 import * as numericOptions from './clause-options/numeric';
 import * as textOptions from './clause-options/text';

 export default {
   name: 'query-builder',
   props: {
     blueprint: {
       required: false,
       type: Object,
       default: () => { return {}; },
     },
     conditions: {
       required: true,
       type: Array,
     },
   },
   computed: {
     selectedConditions() {
       return this.activeBlueprint.conditions;
     },
     conditionOptions() {
       return this.conditions.map((condition) => {
         const { type } = condition;
         return {
           component: this.getOptionComponent(type),
           ...condition,
         };
       });
     },
   },
   data() {
     return {
       activeBlueprint: new Blueprint([{ conditionId: 'text_condition' }]),
     };
   },
   methods: {
     getOptionComponent(type) {
       const {
         TextConditionOption,
         NumericConditionOption,
       } = conditionOptions;

       if (type === 'text') {
         return TextConditionOption;
       }
       if (type === 'numeric') {
         return NumericConditionOption;
       }
     },
   },
   components: {
     Query,
     ConditionSelector,
     ...conditionOptions,
     ...textOptions,
     ...numericOptions,
   },
 };
</script>
