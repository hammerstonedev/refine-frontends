<template>
  <selector>
    <slot>
      <component
        v-for="(clauseOption, key, index) in clauseOptions"
        :is="clauseOption"
        :key="key"
        :selected="index === 0"
        v-bind="$attrs"
      />
    </slot>
  </selector>
</template>

<script>
 import Selector from '@/components/tailwind/selector';

 export default {
   name: 'base-condition',
   components: {
     Selector
   },
   props: {
     clauseOptions: {
       type: Object,
       required: false,
     },
   },
 };
</script>
