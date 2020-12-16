<template>
  <query>
    <div>
      <label>First Name
        <text-condition id="first-name" value="Bob" />
      </label>
      <label>Age
        <numeric-condition id="age" :value1="32" />
      </label>
      <!--
           <label>Age
           <numeric-condition id="age" :from="32" :to="37" />
           </label>
      -->
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
