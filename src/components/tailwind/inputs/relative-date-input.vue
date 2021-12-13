<template>
  <div class="sm:items-center sm:flex gap-x-4">
    <div>
      <input
        class="text-input"
        type="number"
        name="days"
        :value="amount"
        @input="updateAmount"
      />
    </div>

    <selector @select-option="updateUnit">
      <selector-option v-for='unit in units'
                       :key='unit.id'
                       :id="id('unit-' + unit.id)"
                       :display="unit.display"
      />
    </selector>

    <selector @select-option="updateModifier">
      <selector-option v-for='modifier in modifiers'
                       :key='modifier.id'
                       :id="id('modifier-' + modifier.id)"
                       :display="modifier.display"
      />
    </selector>
  </div>
</template>

<script>
  import {Selector, SelectorOption} from "..";
  import {uid} from '../../../mixins';

  export default {
    components: {
      Selector,
      SelectorOption,
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
      meta: {
        type: Object,
        required: false,
        default() {
          return {}
        }
      }
    },
    created() {
      const {modifier} = this;
      this.$emit('input', {modifier});
    },
    computed: {
      units() {
        return this.meta.units;
      },
      modifiers() {
        return this.meta.modifiers;
      }
    },
    methods: {
      id(seed) {
        return `${this.uid}-${seed}`;
      },
      updateModifier: function (nextOption) {
        this.$emit('input', {modifier: nextOption.id})
      },
      updateAmount: function (event) {
        const amount = event.target.value;
        this.$emit('input', {amount});
      },
      updateUnit: function (nextOption) {
        this.$emit('input', {unit: nextOption.id})
      },
    },
  };
</script>
