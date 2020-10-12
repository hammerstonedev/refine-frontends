<template>
  <div id="app">
    <query>
      <text-condition id="firstName">
        <does-not-equal value="four" />
      </text-condition>
    </query>
  </div>
</template>

<script>
 import clauses from './components/renderless/clauses/text';
 import { TextCondition } from './components/renderless/conditions';
 import Query from './components/renderless/query';

 const { DoesNotEqual } = clauses;

 export default {
   name: 'App',
   components: {
     DoesNotEqual,
     TextCondition,
     Query,
   },
 }
</script>
