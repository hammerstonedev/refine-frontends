<template>
  <selector :selectorId="selectorId">
    <slot>
      <component
        v-for="(conditionOption, key, index) in $options.conditionOptions"
        :is="conditionOption"
        :key="key"
        :selected="index === 0"
        v-bind="$attrs"
      />
    </slot>
  </selector>
</template>

<script>
 import Selector from '@/components/tailwind/selector';
 import * as conditionOptions from '@/components/tailwind/condition-options';

 export default {
   name: 'condition-selector',
   components: {
     Selector
   },
   props: {
     selectorId: {
       type: String,
       required: true,
     },
   },
   conditionOptions,
 };
</script>
