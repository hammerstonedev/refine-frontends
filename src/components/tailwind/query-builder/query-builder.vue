<template>
  <renderless-query-builder
    :blueprint="blueprint"
    :conditions="conditions"
    v-slot="{
      groupedBlueprint,
      replaceCriterion,
      addCriterion,
      addGroup,
      removeCriterion,
      conditionPropsFor,
    }"
  >
    <div class="font-sans">
      <div 
        class="bg-gray-50 p-4 mb-4 rounded"
        v-for="(group, index) in groupedBlueprint" 
        :key="index"
      >
        <div
          v-for="selectedCondition in group"
          :key="selectedCondition.uid"
        >
          <renderless-condition
            v-bind="conditionPropsFor(selectedCondition)"
            v-slot="{
              updateInput,
              condition,
            }"
          >
            <component
              @switch-clause="
                ({id: clause}) => updateInput({ clause })
              "
              @remove-condition="removeCriterion(selectedCondition.position)"
              @switch-condition="
                (nextCondition) =>
                  replaceCriterion(selectedCondition.position, conditionPropsFor(nextCondition))
              "
              :is="'ConditionRow'"
              :selectedConditionId="condition.id"
              :conditions="conditions"
              v-bind="{input: condition && {...condition.input}}"
            />
          </renderless-condition>
        </div>
        <button
          @click="addCriterion(group[group.length -1].position)"
          class="background-transparent text-blue-600 text-xs outline-none focus:outline-none flex items-center pt-3"
          type="button"
         >
          <!-- Heroicon name: plus -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span>And</span>
        </button>
      </div>
      <button
        @click="addGroup"
        type="button" 
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add an 'Or'
      </button>
    </div>
    <!-- wrapper div -->
  </renderless-query-builder>
</template>

<script>
import ConditionRow from "./condition-row";
import {
  RenderlessQueryBuilder,
  RenderlessCondition,
} from "@/components/renderless";

export default {
  name: "query-builder",
  props: {
    blueprint: {
      required: false,
      type: Array,
      default: () => {
        return [];
      },
    },
    conditions: {
      required: true,
      type: Array,
    },
  },
  created() {
    if (this.conditions.length === 0) {
      throw new Error(
        "You must provide at least one condition to the query builder."
      );
    }
  },
  components: {
    ConditionRow,
    RenderlessCondition,
    RenderlessQueryBuilder,
  },
};
</script>
