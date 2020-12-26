<template>
  <query>
    <div class="w-1/2">
      <div class="flex justify-start items-center pt-4">
        <label class="pr-4 w-40">Age</label>
        <text-condition id="first-name" value="Bob" />
      </div>
      <div class="flex justify-start items-center pt-4">
        <label class="pr-4 w-40">Age</label>
        <numeric-condition id="age" :value="32" />
      </div>
      <div class="flex justify-start items-center pt-4">
        <label class="pr-4 w-40">Hotness</label>
        <numeric-condition id="hotness" :from="7" :to="10" />
      </div>
    </div>
  </query>
</template>

<script>
 import { TextCondition, NumericCondition, Query } from './components/tailwind';

 export default {
   name: 'App',
   components: {
     NumericCondition,
     TextCondition,
     Query,
   },
 }
</script>
