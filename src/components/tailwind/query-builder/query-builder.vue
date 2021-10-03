<template>
  <renderless-query-builder
    :blueprint="blueprint"
    :conditions="conditions"
    v-slot="{
      groupedBlueprint,
      replaceCondition,
      addCriterion,
      removeCriterion,
      conditionPropsFor,
    }"
  >
    <div class="font-sans">
      <div v-for="(group, index) in groupedBlueprint" :key="index">
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
                  replaceCondition(condition.uid, conditionPropsFor(nextCondition))
              "
              :is="'ConditionRow'"
              :selectedConditionId="condition.condition_id"
              :conditions="conditions"
              v-bind="{input: condition && {...condition.input}}"
            />
          </renderless-condition>
        </div>
        <button
          @click="addCriterion(group[group.length -1].position)"
          type="button"
          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        </button>
      </div>      
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
