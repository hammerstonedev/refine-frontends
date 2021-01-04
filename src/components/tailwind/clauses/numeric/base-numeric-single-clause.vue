<template>
  <component
    :is="ClauseComponent"
    :value1="value"
    v-slot="{ value1, setValue }"
  >
    <div>
      <number-input
        :value="value1"
        @input="value => setValue({ value1: value })"
      />
    </div>
  </component>
</template>

<script>
 import { numericSingleProps } from './mixins';
 import NumberInput from '@/components/tailwind/inputs/number-input'

 export default {
   name: 'base-numeric-single-clause',
   mixins: [numericSingleProps],
   props: {
     ClauseComponent: {
       type: Object,
       required: true,
     },
   },
   components: {
     NumberInput,
   },
 };
</script>
