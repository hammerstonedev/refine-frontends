<template>
  <!-- clause selector should pass down selected clause ID? I thought it handled this internally... -->
  <clause-selector>
    <slot>
      <component
        v-for="(clauseOption, key, index) in clauseOptions"
        :is="clauseOption"
        :key="key"
        :selected="index === 0"
        v-bind="$attrs"
      />
    </slot>
  </clause-selector>
</template>

<script>
 import ClauseSelector from '@/components/tailwind/clause-selector';

 export default {
   name: 'base-condition',
   components: {
     ClauseSelector
   },
   props: {
     clauseOptions: {
       type: Object,
       required: false,
     },
   },
 };
</script>
