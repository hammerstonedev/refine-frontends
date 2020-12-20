<template>
  <query>
    <div>
      <label>First Name
        <text-condition id="first-name" value="Bob" />
      </label>

      <label>Age
        <numeric-condition id="age" :value="32" />
      </label>
      <label>Hotness Scale 1 &mdash;> 10
        <numeric-condition id="hotness" :from="7" :to="10" />
      </label>
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
