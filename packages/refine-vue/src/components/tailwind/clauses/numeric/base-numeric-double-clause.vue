<template>
  <component
    :is="ClauseComponent"
    :value1="from"
    :value2="to"
    v-slot="{ value1, value2, setValue }"
  >
    <div class="sm:flex">
      <div class="sm:mr-2">
        <number-input :value="value1" @input="({ value }) => setValue({ value1: value })" />
      </div>
      <div class="pt-4 sm:pt-0">
        <number-input :value="value2" @input="({ value }) => setValue({ value2: value })" />
      </div>
    </div>
  </component>
</template>

<script>
import { numericDoubleProps } from './mixins';
import NumberInput from '../../../../components/tailwind/inputs/number-input';

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
