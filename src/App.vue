<template>
  <query>
    <div class="w-1/2 p-4">
      <div class="pt-4">
        <label>Age
          <text-condition id="first-name" value="Bob" class="pt-2" />
        </label>
      </div>
      <div class="pt-4">
        <label>Age
          <numeric-condition id="age" :value="32" class="pt-2" />
        </label>
      </div>
      <div class="pt-4">
        <label>Hotness
          <numeric-condition id="hotness" :from="7" :to="10" class="pt-2" />
        </label>
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
