<template>
  <div class="flex items-center">
    <!-- condition selector -->
    <selector
      @select-option="switchCondition"
    >
      <selector-option
        v-for="{ id, display, meta } in conditions"
        :key="id"
        :id="id"
        :display="display"
        :selected="selectedConditionId === id"
      >
        <renderless-clause v-bind="input" v-slot="{ setValue }">
          <!-- clause selector -->
          <selector
            @select-option="switchClause"
          >
            <selector-option
              v-for="{ id: clauseId, display, component } in meta.clauses"
              :key="clauseId"
              :id="clauseId"
              :display="display"
              :selected="input.clause === clauseId"
            >
              <component v-if="component" :is="component" v-bind="input" @input="setValue" />
            </selector-option>
          </selector>
        </renderless-clause>
      </selector-option>
    </selector>
    <button
      @click.prevent="$emit('remove-condition')"
      type="button"
      class="inline-flex items-center py-1 px-3 text-grey-700"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { Selector, SelectorOption } from "..";
import { RenderlessClause } from "@/components/renderless";
import * as inputs from "../inputs";

export default {
  name: "condition",
  props: {
    conditions: {
      required: true,
      type: Array,
    },
    selectedConditionId: {
      type: String,
      required: true,
    },
    input: {
      type: Object,
      required: true,
    },
  },
  methods: {
    switchClause: function(previousClause, nextClause) {
      this.$emit('switch-clause', previousClause, nextClause)
    },
    switchCondition: function(previousCondition, nextCondition) {
      this.$emit('switch-condition', previousCondition, nextCondition);
    },
  },
  components: {
    SelectorOption,
    RenderlessClause,
    Selector,
    ...inputs,
  },
};
</script>
