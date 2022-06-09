<template>
  <refine-flavor as="div" component="inputs.date.relative.wrapper">
    <refine-flavor
      as="input"
      component="inputs.date.relative"
      type="number"
      name="amount"
      :value="amount"
      @input="updateAmount"
    />
    <selector @select-option="updateUnit">
      <selector-option
        v-for="option in units"
        :key="option.id"
        :id="option.id"
        :display="option.display"
        :selected="option.id === unit"
      />
    </selector>

    <selector @select-option="updateModifier">
      <selector-option
        v-for="option in modifiers"
        :key="option.id"
        :id="option.id"
        :selected="option.id === modifier"
        :display="option.display"
      />
    </selector>
  </refine-flavor>
</template>

<script>
import { Selector, SelectorOption } from '../selector';
import { uid } from '../../../mixins';
import { RefineFlavor } from '../query-builder/refine-flavor';

export default {
  name: 'refine-date-input',
  components: {
    Selector,
    SelectorOption,
    RefineFlavor,
  },
  mixins: [uid],
  emits: ['input'],
  props: {
    amount: {
      type: [String, Number],
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
    modifier: {
      type: String,
      required: false,
    },
    units: {
      type: Array,
      required: true,
    },
    modifiers: {
      type: Array,
      required: true,
    },
  },
  created() {
    const { modifier } = this;
    this.$emit('input', { modifier });
  },
  methods: {
    updateModifier({ selectedOptions }) {
      const selected = selectedOptions.map(({ id }) => id);
      this.$emit('input', { modifier: selected[0] });
    },
    updateAmount: function (event) {
      const amount = event.target.value;
      this.$emit('input', { amount });
    },
    updateUnit: function ({ selectedOptions }) {
      const selected = selectedOptions.map(({ id }) => id);
      this.$emit('input', { unit: selected[0] });
    },
  },
};
</script>
