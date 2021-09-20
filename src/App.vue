<template>
  <div>
    <query-builder :conditions="conditions" class="p-4" />
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
          <numeric-condition id="age" :value="32" class="pt-2" />
        </div>
        <div class="pt-4">
          <label>Hotness</label>
          <numeric-condition id="hotness" :from="7" :to="10" class="pt-2" />
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

const conditions = [
  {
    id: "option",
    component: "option-condition",
    display: "Option",
    meta: {
      clauses: [
        {
          id: "in",
          component: "option-input",
          display: "Is One Of",
          meta: [],
        },
        {
          id: "eq",
          component: "option-input",
          display: "Is",
          meta: [],
        },
        {
          id: "dne",
          component: "option-input",
          display: "Is Not",
          meta: [],
        },
        {
          id: "nin",
          component: "option-input",
          display: "Is Not One Of",
          meta: [],
        },
        {
          id: "st",
          display: "Is Set",
          meta: [],
        },
        {
          id: "nst",
          display: "Is Not Set",
          meta: [],
        },
      ],
      options: [
        {
          id: "foo",
          display: "Foo",
        },
        {
          id: "bar",
          display: "Bar",
        },
        {
          id: "foo2",  
          display: "Foo2",
        },
        {
          id: "bar2",
          display: "Bar2",
        },
      ],
    },
    refinements: [],
  },
  {
    id: "text",
    component: "text-condition",
    display: "Text",
    meta: {
      clauses: [
        {
          id: "eq",
          display: "Equals",
          component: "text-input",
          meta: [],
        },
        {
          id: "dne",
          display: "Does Not Equal",
          component: "text-input",
          meta: [],
        },
        {
          id: "sw",
          display: "Starts With",
          component: "text-input",
          meta: [],
        },
        {
          id: "ew",
          display: "Ends With",
          component: "text-input",
          meta: [],
        },
        {
          id: "dsw",
          display: "Does Not Start With",
          component: "text-input",
          meta: [],
        },
        {
          id: "dew",
          display: "Does Not End With",
          component: "text-input",
          meta: [],
        },
        {
          id: "cont",
          display: "Contains",
          component: "text-input",
          meta: [],
        },
        {
          id: "dcont",
          display: "Does Not Contain",
          component: "text-input",
          meta: [],
        },
        {
          id: "st",
          display: "Is Set",
          meta: [],
        },
        {
          id: "nst",
          display: "Is Not Set",
          meta: [],
        },
      ],
    },
    refinements: [],
  },
  {
    id: "bool",
    component: "boolean-condition",
    display: "Bool",
    meta: {
      clauses: [
        {
          id: "true",
          display: "Is True",
          meta: [],
        },
        {
          id: "false",
          display: "Is False",
          meta: [],
        },
      ],
    },
    refinements: [],
  },
  {
    id: "date",
    component: "date-condition",
    display: "Date",
    meta: {
      clauses: [
        {
          id: "eq",
          display: "Is Equal To",
          component: "date-input",
          meta: [],
        },
        {
          id: "dne",
          display: "Is Not Equal To",
          component: "date-input",
          meta: [],
        },
        {
          id: "lte",
          display: "Is On or Before",
          component: "date-input",
          meta: [],
        },
        {
          id: "gte",
          display: "Is On or After",
          component: "date-input",
          meta: [],
        },
        {
          id: "btwn",
          display: "Is Between",
          component: "double-date-input",
          meta: [],
        },
        {
          id: "gt",
          display: "Is More Than",
          component: "relative-date-input",
          meta: [],
        },
        {
          id: "exct",
          display: "Is Exactly",
          component: "relative-date-input",

          meta: [],
        },
        {
          id: "lt",
          display: "Is Less Than",
          component: "relative-date-input",
          meta: [],
        },
        {
          id: "st",
          display: "Is Set",
          component: "date-input",
          meta: [],
        },
        {
          id: "nst",
          display: "Is Not Set",
          component: "date-input",
          meta: [],
        },
      ],
    },
    refinements: [],
  },
  {
    id: "date_with_time",
    component: "date-condition",
    display: "Date With Time",
    meta: {
      clauses: [
        {
          id: "eq",
          display: "Is Equal To",
          meta: [],
        },
        {
          id: "dne",
          display: "Is Not Equal To",
          meta: [],
        },
        {
          id: "lte",
          display: "Is On or Before",
          meta: [],
        },
        {
          id: "gte",
          display: "Is On or After",
          meta: [],
        },
        {
          id: "btwn",
          display: "Is Between",
          meta: [],
        },
        {
          id: "gt",
          display: "Is More Than",
          meta: [],
        },
        {
          id: "exct",
          display: "Is Exactly",
          meta: [],
        },
        {
          id: "lt",
          display: "Is Less Than",
          meta: [],
        },
        {
          id: "st",
          display: "Is Set",
          meta: [],
        },
        {
          id: "nst",
          display: "Is Not Set",
          meta: [],
        },
      ],
    },
    refinements: [],
  },
  {
    id: "timestamp",
    component: "date-condition",
    display: "Timestamp",
    meta: {
      clauses: [
        {
          id: "eq",
          display: "Is Equal To",
          meta: [],
        },
        {
          id: "dne",
          display: "Is Not Equal To",
          meta: [],
        },
        {
          id: "lte",
          display: "Is On or Before",
          meta: [],
        },
        {
          id: "gte",
          display: "Is On or After",
          meta: [],
        },
        {
          id: "btwn",
          display: "Is Between",
          meta: [],
        },
        {
          id: "gt",
          display: "Is More Than",
          meta: [],
        },
        {
          id: "exct",
          display: "Is Exactly",
          meta: [],
        },
        {
          id: "lt",
          display: "Is Less Than",
          meta: [],
        },
        {
          id: "st",
          display: "Is Set",
          meta: [],
        },
        {
          id: "nst",
          display: "Is Not Set",
          meta: [],
        },
      ],
    },
    refinements: [],
  },
  {
    id: "numeric",
    component: "numeric-condition",
    display: "Numeric",
    meta: {
      clauses: [        
        {
          id: "eq",
          display: "Is Equal To",
          component: "number-input",
          meta: [],
        },
        {
          id: "dne",
          display: "Is Not Equal To",
          component: "number-input",
          meta: [],
        },
        {
          id: "gt",
          display: "Is Greater Than",
          component: "number-input",
          meta: [],
        },
        {
          id: "gte",
          display: "Is Greater Than Or Equal To",
          component: "number-input",
          meta: [],
        },
        {
          id: "lt",
          display: "Is Less Than",
          component: "number-input",
          meta: [],
        },
        {
          id: "lte",
          display: "Is Less Than Or Equal To",
          component: "number-input",
          meta: [],
        },
        {
          id: "btwn",
          display: "Is Between",
          component: "double-number-input",
          meta: [],
        },
        {
          id: "nbtwn",
          display: "Is Not Between",
          component: "double-number-input",
          meta: [],
        },
        {
          id: "st",
          display: "Is Set",
          meta: [],
        },
        {
          id: "nst",
          display: "Is Not Set",
          meta: [],
        },
      ],
    },
    refinements: [],
  },
];

export default {
  name: "App",
  data() {
    return {
      conditions,
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
