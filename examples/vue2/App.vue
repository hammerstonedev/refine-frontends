<template>
  <div>
    <div class="w-max">
      <query-builder 
        :errors="errors"
        :conditions="conditions" 
        v-model="groupedBlueprint" 
        class="p-4 w-100" 
      />
    </div>
    <div>{{ groupedBlueprint }}</div>
    <!-- 
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
    -->
  </div>
</template>

<script>
import { QueryBuilder } from "../../packages/refine-vue/dist/vue2/refine-vue.esm";
import './main.css';
import "../../packages/refine-vue/dist/vue2/refine-vue.esm.css";

const groupedBlueprint = [];

const conditions = [{
  id: "option",
  component: "refine-option-condition",
  display: "Option",
  meta: {
    clauses: [
      {
        id: "in",
        component: "refine-option-input",
        display: "Is One Of",
        meta: { multiple: true },
      },
      {
        id: "eq",
        component: "refine-option-input",
        display: "Is",
        meta: {},
      },
      {
        id: "dne",
        component: "refine-option-input",
        display: "Is Not",
        meta: {},
      },
      {
        id: "nin",
        component: "refine-option-input",
        display: "Is Not One Of",
        meta: { multiple: true },
      },
      {
        id: "st",
        display: "Is Set",
        meta: {},
      },
      {
        id: "nst",
        display: "Is Not Set",
        meta: {},
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
  display: "Text",
  meta: {
    clauses: [
      {
        id: "eq",
        display: "Equals",
        component: "refine-text-input",
        meta: {},
      },
      {
        id: "dne",
        display: "Does Not Equal",
        component: "refine-text-input",
        meta: {},
      },
      {
        id: "sw",
        display: "Starts With",
        component: "refine-text-input",
        meta: {},
      },
      {
        id: "ew",
        display: "Ends With",
        component: "refine-text-input",
        meta: {},
      },
      {
        id: "dsw",
        display: "Does Not Start With",
        component: "refine-text-input",
        meta: {},
      },
      {
        id: "dew",
        display: "Does Not End With",
        component: "refine-text-input",
        meta: {},
      },
      {
        id: "cont",
        display: "Contains",
        component: "refine-text-input",
        meta: {},
      },
      {
        id: "dcont",
        display: "Does Not Contain",
        component: "refine-text-input",
        meta: {},
      },
      {
        id: "st",
        display: "Is Set",
        meta: {},
      },
      {
        id: "nst",
        display: "Is Not Set",
        meta: {},
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
        meta: {},
      },
      {
        id: "false",
        display: "Is False",
        meta: {},
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
    format: "YYYY/MM/DD",
    clauses: [
      {
        id: "eq",
        display: "Is Equal To",
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "dne",
        display: "Is Not Equal To",
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "lte",
        display: "Is On or Before",
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "gte",
        display: "Is On or After",
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "btwn",
        display: "Is Between",
        component: "refine-double-date-input",
        meta: {},
      },
      {
        id: "gt",
        display: "Is More Than",
        component: "refine-relative-date-input",
        meta: {},
      },
      {
        id: "exct",
        display: "Is Exactly",
        component: "refine-relative-date-input",
        meta: {},
      },
      {
        id: "lt",
        display: "Is Less Than",
        component: "refine-relative-date-input",
        meta: {},
      },
      {
        id: "st",
        display: "Is Set",
        meta: {},
      },
      {
        id: "nst",
        display: "Is Not Set",
        meta: {},
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
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "dne",
        display: "Is Not Equal To",
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "lte",
        display: "Is On or Before",
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "gte",
        display: "Is On or After",
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "btwn",
        display: "Is Between",
        component: "refine-double-date-input",
        meta: {},
      },
      {
        id: "gt",
        display: "Is More Than",
        component: "refine-relative-date-input",
        meta: {},
      },
      {
        id: "exct",
        display: "Is Exactly",
        component: "refine-relative-date-input",
        meta: {},
      },
      {
        id: "lt",
        display: "Is Less Than",
        component: "refine-relative-date-input",
        meta: {},
      },
      {
        id: "st",
        display: "Is Set",
        meta: {},
      },
      {
        id: "nst",
        display: "Is Not Set",
        meta: {},
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
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "dne",
        display: "Is Not Equal To",
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "lte",
        display: "Is On or Before",
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "gte",
        display: "Is On or After",
        component: "refine-date-input",
        meta: {},
      },
      {
        id: "btwn",
        display: "Is Between",
        component: "refine-double-date-input",
        meta: {},
      },
      {
        id: "gt",
        display: "Is More Than",
        component: "refine-relative-date-input",
        meta: {},
      },
      {
        id: "exct",
        display: "Is Exactly",
        component: "refine-relative-date-input",
        meta: {},
      },
      {
        id: "lt",
        display: "Is Less Than",
        component: "refine-relative-date-input",
        meta: {},
      },
      {
        id: "st",
        display: "Is Set",
        meta: {},
      },
      {
        id: "nst",
        display: "Is Not Set",
        meta: {},
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
        component: "refine-number-input",
        meta: {},
      },
      {
        id: "dne",
        display: "Is Not Equal To",
        component: "refine-number-input",
        meta: {},
      },
      {
        id: "gt",
        display: "Is Greater Than",
        component: "refine-number-input",
        meta: {},
      },
      {
        id: "gte",
        display: "Is Greater Than Or Equal To",
        component: "refine-number-input",
        meta: {},
      },
      {
        id: "lt",
        display: "Is Less Than",
        component: "refine-number-input",
        meta: {},
      },
      {
        id: "lte",
        display: "Is Less Than Or Equal To",
        component: "refine-number-input",
        meta: {},
      },
      {
        id: "btwn",
        display: "Is Between",
        component: "refine-double-number-input",
        meta: {},
      },
      {
        id: "nbtwn",
        display: "Is Not Between",
        component: "refine-double-number-input",
        meta: {},
      },
      {
        id: "st",
        display: "Is Set",
        meta: {},
      },
      {
        id: "nst",
        display: "Is Not Set",
        meta: {},
      },
    ],
  },
  refinements: [],
},    
{
  "id": "events.name",
  "display": "Events.Name",
  "meta": {
    "clauses": [
      { "id": "eq", "display": "Equals", "meta": {}, "component": "refine-text-input" },
      { "id": "dne", "display": "Does Not Equal", "meta": {}, "component": "refine-text-input" },
      { "id": "sw", "display": "Starts With", "meta": {}, "component": "refine-text-input" },
      { "id": "ew", "display": "Ends With", "meta": {}, "component": "refine-text-input" },
      { "id": "dsw", "display": "Does Not Start With", "meta": {}, "component": "refine-text-input" },
      { "id": "dew", "display": "Does Not End With", "meta": {}, "component": "refine-text-input" },
      { "id": "cont", "display": "Contains", "meta": {}, "component": "refine-text-input" },
      { "id": "dcont", "display": "Does Not Contain", "meta": {}, "component": "refine-text-input" },
      { "id": "st", "display": "Is Set", "meta": {}, "component": "refine-text-input" },
      { "id": "nst", "display": "Is Not Set", "meta": {}, "component": "refine-text-input" }
    ]
  },
  "refinements": [
    {
      "id": "count_refinement",
      "display": "Count Refinement",
      "meta": {
        "clauses": [
          { "id": "eq", "display": "Is Equal To", "meta": {}, "component": "refine-number-input" },
          { "id": "dne", "display": "Is Not Equal To", "meta": {}, "component": "refine-number-input" },
          { "id": "gt", "display": "Is Greater Than", "meta": {}, "component": "refine-number-input" },
          {
            "id": "gte",
            "display": "Is Greater Than Or Equal To",
            "meta": {}, 
            "component": "refine-number-input"
          },
          { "id": "lt", "display": "Is Less Than", "meta": {} },
          {
            "id": "lte",
            "display": "Is Less Than Or Equal To",
            "meta": {}, 
            "component": "refine-number-input"
          },
          { "id": "btwn", "display": "Is Between", "meta": {}, "component": "refine-number-input" },
          { "id": "nbtwn", "display": "Is Not Between", "meta": {}, "component": "refine-number-input" },
          { "id": "st", "display": "Is Set", "meta": {}, "component": "refine-number-input" },
          { "id": "nst", "display": "Is Not Set", "meta": {}, "component": "refine-number-input" }
        ]
      },
      "refinements": []
    }, {
      "id": "kaboom_refinement",
      "display": "Kaboom Refinement",
      "meta": {
        "clauses": [
          { "id": "eq", "display": "Is Equal To", "meta": {}, "component": "refine-number-input" },
          { "id": "dne", "display": "Is Not Equal To", "meta": {}, "component": "refine-number-input" },
          { "id": "gt", "display": "Is Greater Than", "meta": {}, "component": "refine-number-input" },
          {
            "id": "gte",
            "display": "Is Greater Than Or Equal To",
            "meta": {}, 
            "component": "refine-number-input"
          },
          { "id": "lt", "display": "Is Less Than", "meta": {} },
          {
            "id": "lte",
            "display": "Is Less Than Or Equal To",
            "meta": {}, 
            "component": "refine-number-input"
          },
          { "id": "btwn", "display": "Is Between", "meta": {}, "component": "refine-number-input" },
          { "id": "nbtwn", "display": "Is Not Between", "meta": {}, "component": "refine-number-input" },
          { "id": "st", "display": "Is Set", "meta": {}, "component": "refine-number-input" },
          { "id": "nst", "display": "Is Not Set", "meta": {}, "component": "refine-number-input" }
        ]
      },
      refinements: [],
    },
  ]
}
  ];
  
export default {
  name: "App",
  data() {
    return {
      conditions,
      groupedBlueprint,
      errors: {
        0: [{ 
            id: 23434, 
            message: "You messed up big time",
          }, {
            id: 454534,
            message: "Good luck with your life"
          }]
      },
    };
  },
  components: {
    QueryBuilder,
  },
};
</script>