<template>
  <component :is="ClauseComponent" :value="value" v-slot="{ value, setValue }">
    <text-input :value="value" @input="setValue" />
  </component>
</template>

<script>
import TextInput from '../../../../components/base/inputs/text-input';

export default {
  name: 'base-numeric-single-clause',
  props: {
    ClauseComponent: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  components: {
    TextInput,
  },
};
</script>
