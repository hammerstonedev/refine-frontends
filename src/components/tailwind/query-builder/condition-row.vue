<template>
  <div class="flex items-center py-1">
    <!-- condition selector -->
    <selector @select-option="switchCondition">
      <selector-option
        v-for="{ id, display, meta } in conditions"
        :key="id"
        :id="id"
        :display="display"
        :selected="selectedConditionId === id"
      >
        <renderless-clause v-bind="input" v-slot="{ setValue }">
          <!-- clause selector -->
          <selector @select-option="switchClause" class="ml-4">
            <selector-option
              v-for="{ id: clauseId, display, component } in meta.clauses"
              :key="clauseId"
              :id="clauseId"
              :display="display"
              :selected="input.clause === clauseId"
            >
              <component
                v-if="component"
                :is="component"
                v-bind="input"
                :meta="meta"
                @input="setValue"
                class="ml-4"
              />
            </selector-option>
          </selector>
        </renderless-clause>
      </selector-option>
    </selector>
    <button
      @click.prevent="$emit('remove-condition')"
      type="button"
      class="inline-flex items-center py-1 px-3 text-gray-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
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
    switchClause: function ({ selectedOption: nextClause }) {
      this.$emit("switch-clause", nextClause);
    },
    switchCondition: function ({ selectedOption: nextCondition }) {
      this.$emit("switch-condition", nextCondition);
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
