<template>
  <refine-flavor as="div" component="inputs.date.relative.wrapper">
    <refine-flavor as="input" type="number" name="days" :value="amount" @input="updateAmount" />
    <selector @select-option="updateUnit">
      <selector-option
        v-for="unit in units"
        :key="unit.id"
        :id="id('unit-' + unit.id)"
        :display="unit.display"
      />
    </selector>

    <selector @select-option="updateModifier">
      <selector-option
        v-for="modifier in modifiers"
        :key="modifier.id"
        :id="id('modifier-' + modifier.id)"
        :display="modifier.display"
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
    id(seed) {
      return `${this.uid}-${seed}`;
    },
    updateModifier: function (nextOption) {
      this.$emit('input', { modifier: nextOption.id });
    },
    updateAmount: function (event) {
      const amount = event.target.value;
      this.$emit('input', { amount });
    },
    updateUnit: function (nextOption) {
      this.$emit('input', { unit: nextOption.id });
    },
  },
};
</script>
