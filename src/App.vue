<template>
  <div id="app">
    <query>
      <text-condition id="firstName" value="bob is cool" />
    </query>
  </div>
</template>

<script>
 import { TextCondition } from './components/tailwind/query-builder/conditions';
 import Query from './components/renderless/query';

 export default {
   name: 'App',
   components: {
     TextCondition,
     Query,
   },
 }
</script>
