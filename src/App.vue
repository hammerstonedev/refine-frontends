<template>
  <div>
    <query-builder :conditions="conditions" class="p-4" />
    <query>
      <div class="p-4">
        <condition-selector>
          <text-condition-option id="last-name" display="Last Name" />
          <numeric-condition-option id="years-of-experience" display="Years of Experience" />
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
           "component": "DoesNotEqual",
         },
         {
           "id": "starts_with",
           "display": "Starts With",
           "component": "StartsWith",
         },
         {
           "id": "ends_with",
           "display": "Ends With",
           "component": "EndsWith",
         },
         {
           "id": "contains",
           "display": "Contains",
           "component": "Contains",
         },
         {
           "id": "doesnt_contain",
           "display": "Does Not Contain",
           "component": "DoesNotContain",
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
           "display": "Is Equal To"
         },
         {
           "id": "gt",
           "display": "Is Greater Than"
         },
         {
           "id": "gte",
           "display": "Is Greater Than Or Equal To"
         },
         {
           "id": "lt",
           "display": "Is Less Than"
         },
         {
           "id": "lte",
           "display": "Is Less Than Or Equal To"
         },
         {
           "id": "between",
           "display": "Is Between"
         },
         {
           "id": "set",
           "display": "Is Set"
         },
         {
           "id": "not_set",
           "display": "Is Not Set"
         }
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
