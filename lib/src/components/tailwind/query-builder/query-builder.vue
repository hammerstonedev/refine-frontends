<template>
  <renderless-query-builder
    :blueprint="blueprint"
    :conditions="conditions"
    @change="onChange"
    v-slot="{
      groupedBlueprint,
      replaceCriterion,
      insertCriterion,
      addGroup,
      removeCriterion,
      conditionFor,
    }"
  >
    <div class="refine-query-builder-wrapper">
      <div class="refine-query-builder-condition-group" v-for="(group, index) in groupedBlueprint" :key="index">
        <div class='refine-query-builder-condition' v-for="(criterion, index) in group" :key="criterion.uid">
          <renderless-condition
            v-bind="conditionFor({id: criterion.condition_id, ...criterion})"
            v-slot="{ switchClause }"
          >
            <criterion
              @switch-clause="({ id: clause }) => switchClause(clause)"
              @remove-condition="removeCriterion(criterion.position)"
              @switch-condition="
                (nextCondition) =>
                  replaceCriterion(
                    criterion.position,
                    conditionFor(nextCondition)
                  )
              "
              :conditionId="criterion.condition_id"
              :conditions="conditions"
              :errors="errors[index]"
              :input="criterion.input"
            />           
          </renderless-condition>
        </div>
        <button
          @click="insertCriterion(group[group.length - 1].position)"
          class="refine-query-builder-and-button"
          tabindex="0"
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
          <span class='refine-query-builder-and-button-span'>And</span>
        </button>
      </div>
      <button @click="addGroup" type="button" class="refine-query-builder-or-button">
        Add an 'Or'
      </button>
    </div>
    <!-- wrapper div -->
  </renderless-query-builder>
</template>
<script>
import Criterion from "./criterion";
import {
  RenderlessQueryBuilder,
  RenderlessCondition,
} from "../../../components/renderless";

export default {
  name: "query-builder",
  model: {
    prop: "blueprint",
    event: "change",
  },
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
    errors: {
      required: false,
      type: Object,
      default: () => { return {}; },
    },
  },
  methods: {
    onChange(newBlueprint) {
      // bubble up the change event.
      this.$emit("change", newBlueprint);
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
    Criterion,
    RenderlessCondition,
    RenderlessQueryBuilder,
  },
};
</script>
