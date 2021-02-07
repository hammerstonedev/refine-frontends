<template>
  <div>
    <query-builder :conditions="conditions" class="p-4" />
    <query>
      <div class="p-4">
        <condition-selector>
          <text-condition-option id="last-name" display="Last Name" />
          <numeric-condition-option id="years-of-experience" display="Years of Experience">
            <is-between-option />
            <is-not-between-option />
          </numeric-condition-option>
        </condition-selector>
        <condition-selector>
          <numeric-condition-option id="years-of-experience" display="Years of Experience" />
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
 } from './components/tailwind';

 import {
   IsBetweenOption,
   IsNotBetweenOption,
 } from './components/tailwind/clause-options/numeric';

 const conditions = [{
   "id": "name",
   "type": "text",
   "display": "Name",
   "meta": {
     "clauses": [{
       "id": "eq",
       "display": "Equals",
       "requires": ["value"],
       "component": "TextInput",
     }, {
       "id": "dne",
       "display": "Does Not Equal",
       "requires": ["value"],
       "component": "TextInput",
     }, {
       "id": "sw",
       "display": "Starts With",
       "requires": ["value"],
       "component": "TextInput",
     }, {
       "id": "ew",
       "display": "Ends With",
       "requires": ["value"],
       "component": "TextInput",
     }, {
       "id": "dsw",
       "display": "Does Not Start With",
       "requires": ["value"],
       "component": "TextInput",
     }, {
       "id": "dew",
       "display": "Does Not End With",
       "requires": ["value"],
       "component": "TextInput",
     }, {
       "id": "cont",
       "display": "Contains",
       "requires": ["value"],
       "component": "TextInput",
     }, {
       "id": "dcont",
       "display": "Does Not Contain",
       "requires": ["value"],
       "component": "TextInput",
     }],
   },
 }, {
   "id": "tracked_count",
   "type": "numeric",
   "component": "numeric-condition",
   "display": "Employee Count",
   "meta": {
     "clauses": [{
       "id": "eq",
       "display": "Is Equal To",
       "requires": ["value1"],
       component: 'NumberInput',
     }, {
       "id": "dne",
       "display": "Is Not Equal To",
       "requires": ["value1"],
       component: 'NumberInput',
     }, {
       "id": "gt",
       "display": "Is Greater Than",
       "requires": ["value1"],
       component: 'NumberInput',
     }, {
       "id": "gte",
       "display": "Is Greater Than Or Equal To",
       "requires": ["value1"],
       component: 'NumberInput',
     }, {
       "id": "lt",
       "display": "Is Less Than",
       "requires": ["value1"],
       component: 'NumberInput',
     }, {
       "id": "lte",
       "display": "Is Less Than Or Equal To",
       "requires": ["value1"],
       component: 'NumberInput',
     }, {
       "id": "btwn",
       "display": "Is Between",
       "requires": ["value1",
                    "value2"],
       component: 'DoubleNumberInput',
     }, {
       "id": "nbtwn",
       "display": "Is Not Between",
       "requires": ["value1",
                    "value2"],
       component: 'DoubleNumberInput',
     }],
   },
 }];


   export default {
     name: 'App',
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
   }
</script>
