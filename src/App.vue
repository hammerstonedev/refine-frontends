<template>
  <div id="app">
    <query>
      <text-condition id="firstName" value="bob is cool" />
    </query>
  </div>
</template>

<script>
 import { TextCondition, Query } from './components/tailwind';

 export default {
   name: 'App',
   components: {
     TextCondition,
     Query,
   },
 }
</script>
