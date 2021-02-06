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

 const conditions = [
   {
     "id": "text_condition",
     "type": "text",
     "display": "Text Condition",
     "meta": {
       "clauses": [
         {
           "id": "doesnt_equal",
           "display": "Does Not Equal",
           "component": "TextInput",
         },
         {
           "id": "starts_with",
           "display": "Starts With",
           "component": "TextInput",
         },
         {
           "id": "ends_with",
           "display": "Ends With",
           "component": "TextInput",
         },
         {
           "id": "contains",
           "display": "Contains",
           "component": "TextInput",
         },
         {
           "id": "doesnt_contain",
           "display": "Does Not Contain",
           "component": "TextInput",
         },
       ]
     }
   },
   {
     "id": "numeric_condition",
     "type": "numeric",
     "display": "Numeric Condition",
     "meta": {
       "clauses": [
         {
           "id": "eq",
           "display": "Is Equal To",
           "component": 'NumberInput',
         },
         {
           "id": "gt",
           "display": "Is Greater Than",
           component: 'NumberInput',
         },
         {
           "id": "gte",
           "display": "Is Greater Than Or Equal To",
           component: 'NumberInput',
         },
         {
           "id": "lt",
           "display": "Is Less Than",
           component: 'NumberInput',
         },
         {
           "id": "lte",
           "display": "Is Less Than Or Equal To",
           "component": "NumberInput",
         },
         {
           "id": "between",
           "display": "Is Between",
           "component": "DoubleNumberInput",
         },
         {
           "id": "notbetween",
           "display": "Is Not Between",
           "component": "DoubleNumberInput",
         },
       ]
     }
   },
 ];


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
