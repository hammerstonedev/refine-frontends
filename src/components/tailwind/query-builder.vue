<template>
  <query
    :blueprint="blueprint"
    builder-mode-active
    v-slot="{ selectedConditions, replaceCondition, addCondition, removeCondition }"
  >
    <div
      class="font-sans"
    >
      <div
        v-for="selectedCondition in selectedConditions"
      >
        <renderless-condition
          v-bind="selectedCondition"
          v-slot="{ condition: { input }, updateInput }"
        >
          <!-- condition selector -->
          <selector
            @select-option="({ id: newConditionId }) => replaceCondition(selectedCondition.uid, newConditionId)"
          >
            <option
              v-for="{id, type, display, meta } in conditions"
              :id="id"
              :type="type"
              :display="display"
              :selected="selectedCondition.id === id"
            >
              <renderless-clause
                v-bind="input"
                v-slot="setValue"
              >
                <!-- clause selector -->
                <selector
                  @select-option="({ id: clause }) => updateInput({ clause })"
                >
                  <option
                    v-for="{ id: clauseId, type, Component } in meta.clauses"
                    :selected="input.clause == clauseId"
                  >
                    <component
                      :is="Component"
                      v-bind="selectedCondition.input"
                      @input="setValue"
                    />
                  </option>
                </selector>
              </renderless-clause>
            </option>
          </selector>
          <button
            @click.prevent="blueprint.removeCondition(component)"
            type="button"
            class="inline-flex items-center py-1 px-3 text-grey-700"
          >
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <button>
        </renderless-condition>
      </div><!-- condition row div -->
    </div><!-- wrapper div -->
  </query>
</template>

<script>
 import { Query, Selector } from '.';

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
     Query,
   },
 };
</script>
