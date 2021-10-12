<template>
  <div>
    <div class="w-max">
      <query-builder :conditions="conditions" v-model="groupedBlueprint" class="p-4 w-100" />
    </div>
    <div>{{ groupedBlueprint }}</div>
    <query>
      <div class="p-4">
        <condition-selector>
          <text-condition-option id="last-name" display="Last Name" />
          <numeric-condition-option
            id="years-of-experience"
            display="Years of Experience"
            :selected="true"
          >
            <is-between-option :selected="true" />
            <is-not-between-option />
          </numeric-condition-option>
        </condition-selector>
        <condition-selector>
          <numeric-condition-option
            id="years-of-experience"
            display="Years of Experience"
            :selected="true"
          />
          <text-condition-option id="last-name" display="Last Name" />
        </condition-selector>
        <div class="pt-4">
          <label>Name</label>
          <text-condition id="first-name" value="Bob" class="pt-2" />
        </div>
        <div class="pt-4">
          <label>Age</label>
          <numeric-condition id="age" value="32" class="pt-2" />
        </div>
        <div class="pt-4">
          <label>Hotness</label>
          <numeric-condition id="hotness" from="7" to="10" class="pt-2" />
        </div>
      </div>
    </query>
  </div>
</template>

<script>
import {
  TextCondition,
  NumericCondition,
  Query,
  ConditionSelector,
  TextConditionOption,
  NumericConditionOption,
  QueryBuilder,
} from "./components/tailwind";

import {
  IsBetweenOption,
  IsNotBetweenOption,
} from "./components/tailwind/clause-options/numeric";

const groupedBlueprint = [];

const conditions = [
    {
      "id": "email_address",
      "display": "Email address",
      "meta": {
        "clauses": [
          { "id": "eq", "display": "Equals", "meta": {}, "component": "text-input" },
          { "id": "dne", "display": "Does Not Equal", "meta": {}, "component": "text-input" },
          { "id": "sw", "display": "Starts With", "meta": {}, "component": "text-input" },
          { "id": "ew", "display": "Ends With", "meta": {}, "component": "text-input" },
          { "id": "dsw", "display": "Does Not Start With", "meta": {}, "component": "text-input" },
          { "id": "dew", "display": "Does Not End With", "meta": {}, "component": "text-input" },
          { "id": "cont", "display": "Contains", "meta": {}, "component": "text-input" },
          { "id": "dcont", "display": "Does Not Contain", "meta": {}, "component": "text-input" },
          { "id": "st", "display": "Is Set", "meta": {}, "component": "text-input" },
          { "id": "nst", "display": "Is Not Set", "meta": {}, "component": "text-input" }
        ]
      },
      "refinements": []
    },
    {
      "id": "events.name",
      "display": "Events.Name",
      "meta": {
        "clauses": [
          { "id": "eq", "display": "Equals", "meta": {}, "component": "text-input" },
          { "id": "dne", "display": "Does Not Equal", "meta": {}, "component": "text-input" },
          { "id": "sw", "display": "Starts With", "meta": {}, "component": "text-input" },
          { "id": "ew", "display": "Ends With", "meta": {}, "component": "text-input" },
          { "id": "dsw", "display": "Does Not Start With", "meta": {}, "component": "text-input" },
          { "id": "dew", "display": "Does Not End With", "meta": {}, "component": "text-input" },
          { "id": "cont", "display": "Contains", "meta": {}, "component": "text-input" },
          { "id": "dcont", "display": "Does Not Contain", "meta": {}, "component": "text-input" },
          { "id": "st", "display": "Is Set", "meta": {}, "component": "text-input" },
          { "id": "nst", "display": "Is Not Set", "meta": {}, "component": "text-input" }
        ]
      },
      "refinements": [
        {
          "id": "count_refinement",
          "display": "Count Refinement",
          "meta": {
            "clauses": [
              { "id": "eq", "display": "Is Equal To", "meta": {}, "component": "numeric-input" },
              { "id": "dne", "display": "Is Not Equal To", "meta": {}, "component": "numeric-input" },
              { "id": "gt", "display": "Is Greater Than", "meta": {}, "component": "numeric-input" },
              {
                "id": "gte",
                "display": "Is Greater Than Or Equal To",
                "meta": {}, 
                "component": "numeric-input"
              },
              { "id": "lt", "display": "Is Less Than", "meta": {} },
              {
                "id": "lte",
                "display": "Is Less Than Or Equal To",
                "meta": {}, 
                "component": "numeric-input"
              },
              { "id": "btwn", "display": "Is Between", "meta": {}, "component": "numeric-input" },
              { "id": "nbtwn", "display": "Is Not Between", "meta": {}, "component": "numeric-input" },
              { "id": "st", "display": "Is Set", "meta": {}, "component": "numeric-input" },
              { "id": "nst", "display": "Is Not Set", "meta": {}, "component": "numeric-input" }
            ]
          },
          "refinements": []
        }
      ]
    }
  ];
  
export default {
  name: "App",
  data() {
    return {
      conditions,
      groupedBlueprint,
    };
  },
  components: {
    IsBetweenOption,
    IsNotBetweenOption,
    ConditionSelector,
    TextConditionOption,
    NumericConditionOption,
    NumericCondition,
    TextCondition,
    Query,
    QueryBuilder,
  },
};
</script>
