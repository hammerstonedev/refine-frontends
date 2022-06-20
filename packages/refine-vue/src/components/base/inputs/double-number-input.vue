<template>
  <refine-flavor as="div" component="inputs.number.double.wrapper">
    <number-input :meta="meta" :value="value1" @input="updateFirstValue" />
    <refine-flavor as="span" component="inputs.number.double.joiner" v-if="joinWord"
      >{{ joinWord }}
    </refine-flavor>
    <number-input :meta="meta" :value="value2" @input="updateSecondValue" />
  </refine-flavor>
</template>

<script>
import { RefineFlavor } from '../query-builder/refine-flavor';
import NumberInput from './number-input';

export default {
  name: 'refine-double-number-input',
  data() {
    return {
      currentValue: this.value,
    };
  },
  emits: ['input'],
  computed: {
    joinWord() {
      // @TODO Meta helper
      return Object.prototype.hasOwnProperty.call(this.meta, 'joiner') ? this.meta.joiner : 'and';
    },
  },
  methods: {
    updateFirstValue: function ({ value1 }) {
      this.$emit('input', { value1: value1 });
    },

    // The single number input always emits value1, here we
    // remap it to value2 for the double number input.
    updateSecondValue: function ({ value1 }) {
      this.$emit('input', { value2: value1 });
    },
  },
  props: {
    value1: {
      type: [String, Number],
      required: false,
    },
    value2: {
      type: [String, Number],
      required: false,
    },
    meta: {
      type: Object,
      required: false,
      default: () => {
        return {};
      },
    },
  },
  components: {
    NumberInput,
    RefineFlavor,
  },
};
</script>
