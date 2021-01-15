<template>
  <selector>
    <slot>
    </slot>
  </selector>
</template>

<script>
 import Selector from '@/components/tailwind/selector';

 export default {
   name: 'condition-selector',
   components: {
     Selector
   }
 };
</script>
