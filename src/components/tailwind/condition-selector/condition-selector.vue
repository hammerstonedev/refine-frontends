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
     selectOption(previousOption, nextOption) {
       const { condition } = previousOption;
       const { id, type } = nextOption;
       this.$emit('select-condition', condition, { id, type })
     },
   },
   components: {
     Selector
   }
 };
</script>
