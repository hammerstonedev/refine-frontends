<template>
  <query
  >
    <div
      class="font-sans"
    >
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
        <button
          @click.prevent="removeCondition(selectedCondition)"
          type="button"
          class="inline-flex items-center py-1 px-3 text-grey-700"
        >
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </condition-selector>
      <div class="lg:flex lg:items-center pt-2">
        <button
          @click="addCondition"
          type="button"
          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <!-- Heroicon name: plus -->
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <span class="pl-2">Add a condition</span>
      </div>
    </div>
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
       type: Array,
       default: () => { return []; },
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
           component: this.optionComponentFor(type),
           ...condition,
         };
       });
     },
   },
   data() {
     return {
       activeBlueprint: new Blueprint(this.blueprint),
     };
   },
   created() {
     if (this.conditions.length === 0) {
       throw new Error('You must provide at least one condition to the query builder.');
     }

     if ([...this.activeBlueprint.conditions].length === 0) {
       this.addCondition();
     }
   },
   methods: {
     removeCondition(condition) {
       this.activeBlueprint.removeCondition(condition);
     },
     addCondition() {
       this.activeBlueprint.addCondition({
         ...this.conditions[0],
         conditionId: this.conditions[0].id,
         depth: 0,
       });
     },
     optionComponentFor(type) {
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
