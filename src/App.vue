<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
