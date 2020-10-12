<template>
  <div id="app">
    <query>
      <text-condition id="firstName">
        <equals value="four" />
      </text-condition>
    </query>
  </div>
</template>

<script>
 import Equals from './components/tailwind/clauses/text/text-equals';
 import { TextCondition } from './components/renderless/conditions';
 import Query from './components/renderless/query';

 export default {
   name: 'App',
   components: {
     Equals,
     TextCondition,
     Query,
   },
 }
</script>
