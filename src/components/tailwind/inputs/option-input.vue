<template>
  <selector
    :isMultiSelect="isMulti"
    @select-option="selectOption"
    @deselect-option="deselectOption"
  >
    <selector-option
      v-for="{ id, display } in meta.options"
      :key="id"
      :id="id"
      :display="display"
      :selected="isSelected(id)"
    />
  </selector>
</template>

<script>
import { Selector, SelectorOption } from "..";

export default {
  name: "option-input",
  components: {
    Selector,
    SelectorOption,
  },
  inject: ["condition"],
  props: {
    selected: {
      type: Array,
      required: false,
      default: () => [],
    },
    meta: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isMulti: function () {
      const { input } = this.condition;
      const { clause } = input;

      // these clause ids are for 'One Of' or "Not One Of"
      // which requires a multi select
      return clause === "in" || clause === "nin";
    },
  },
  methods: {
    selectOption({ selectedOptions }) {
      const selected = selectedOptions.map(({ id }) => id);
      this.$emit("input", { selected });
    },
    deselectOption({ selectedOptions }) {
      const selected = selectedOptions.map(({ id }) => id);
      this.$emit("input", { selected });
    },
    isSelected(id) {
      let selected = false;

      this.selected.forEach((selectedId) => {
        if (selectedId === id) {
          selected = true;
        }
      });

      return selected;
    },
  },
};
</script>
