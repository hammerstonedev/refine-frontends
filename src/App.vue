<template>
  <query>
    <div class="p-4">
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
