<template>
  <component
    :is="ClauseComponent"
    :value1="from"
    :value2="to"
    v-slot="{ value1, value2, setValue }"
  >
    <number-input :value="value1" @input="({ value }) => setValue({ value1: value })" />
    <number-input :value="value2" @input="({ value }) => setValue({ value2: value })" />
  </component>
</template>

<script>
import { numericDoubleProps } from './mixins';
import NumberInput from '../../../../components/base/inputs/number-input';

export default {
  name: 'base-numeric-double-clause',
  mixins: [numericDoubleProps],
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
