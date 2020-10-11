<template>
  <div id="app">
    <query>
      <condition id="firstName" type="text">
        <does-not-equal value="four" />
      </condition>
    </query>
  </div>
</template>

<script>
 import clauses from './components/renderless/clauses/text';
 import Condition from './components/renderless/condition';
 import Query from './components/renderless/query';

 const { DoesNotEqual } = clauses;

 export default {
   name: 'App',
   components: {
     DoesNotEqual,
     Condition,
     Query,
   },
 }
</script>
