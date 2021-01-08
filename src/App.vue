<template>
  <query>
    <div class="p-4">
      <condition-selector>
        <text-condition-option id="last-name" display="Last Name" />
        <numeric-condition-option id="years-of-experience" display="Years of Experience" />
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
</template>

<script>
 import {
   TextCondition,
   NumericCondition,
   Query,
   ConditionSelector,
   TextConditionOption,
   NumericConditionOption,
 } from './components/tailwind';

 export default {
   name: 'App',
   components: {
     ConditionSelector,
     TextConditionOption,
     NumericConditionOption,
     NumericCondition,
     TextCondition,
     Query,
   },
 }
</script>
