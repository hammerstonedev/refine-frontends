<template>
  <renderless-query-builder
    :blueprint="blueprint"
    :conditions="conditions"
    v-slot="{ selectedConditions, replaceCondition, addCondition, removeCondition, conditionPropsFor }"
  >
    <div
      class="font-sans"
    >
      <div
        v-for="selectedCondition in selectedConditions"
        :key="selectedCondition.uid"
      >
        <renderless-condition
          v-bind="conditionPropsFor(selectedCondition)"
          v-slot="{ updateInput, condition: { input, uid, id: selectedConditionId } }"
        >
          <div>
            <!-- condition selector -->
            <selector
              @select-option="(previousCondition, nextCondition) => replaceCondition(uid, conditionPropsFor(nextCondition))"
            >
              <selector-option
                v-for="{id, type, display, meta } in conditions"
                :key="id"
                :id="id"
                :display="display"
                :selected="selectedConditionId === id"
              >
                <renderless-clause
                  :type="type"
                  v-bind="input"
                  v-slot="{ setValue }"
                >
                  <!-- clause selector -->
                  <selector
                    @select-option="({ id: clause }) => updateInput({ clause })"
                  >
                    <selector-option
                      v-for="{ id: clauseId, display, component } in meta.clauses"
                      :key="clauseId"
                      :id="clauseId"
                      :display="display"
                      :selected="input.clause == clauseId"
                    >
                      <component
                        :is="component"
                        v-bind="input"
                        @input="setValue"
                      />
                    </selector-option>
                  </selector>
                </renderless-clause>
              </selector-option>
            </selector>
            <button
              @click.prevent="removeCondition(uid)"
              type="button"
              class="inline-flex items-center py-1 px-3 text-grey-700"
            >
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </renderless-condition>
      </div><!-- condition row div -->
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
    </div><!-- wrapper div -->
  </renderless-query-builder>
</template>

<script>
 import { Selector, SelectorOption } from '.';
 import {
   RenderlessQueryBuilder,
   RenderlessCondition,
   RenderlessClause,
 } from '@/components/renderless';
 import * as inputs from './inputs';

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
   created() {
     if (this.conditions.length === 0) {
       throw new Error('You must provide at least one condition to the query builder.');
     }
   },
   components: {
     SelectorOption,
     RenderlessCondition,
     RenderlessQueryBuilder,
     RenderlessClause,
     Selector,
     ...inputs,
   },
 };
</script>
