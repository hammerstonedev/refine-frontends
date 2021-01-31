<template>
  <selector
    @select-option="selectOption"
  >
    <slot>
    </slot>
  </selector>
</template>

<script>
 import Selector from '@/components/tailwind/selector';

 export default {
   name: 'condition-selector',
   methods: {
     selectOption(...args) {
       this.$emit('select-condition', ...args)
     },
   },
   components: {
     Selector
   }
 };
</script>
