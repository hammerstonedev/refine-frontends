<template>
  <query>
    <div>
      <label>First Name
        <text-condition id="first-name" value="Bob" />
      </label>
    </div>
  </query>
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
