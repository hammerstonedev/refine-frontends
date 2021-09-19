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
  created() {
    const firstOption = this.meta.options[0];
    const { id: firstOptionId } = firstOption;

    // If switching to a single select option don't
    // leave multiple selected options in the input,
    // default to the first. Also if there are no
    // selected options, add the first one to the input
    // debatable whether this should be here or further
    // up in the builder, e.g. addCondition method.
    if (!this.isMulti && this.selected.length !== 1) {
      this.$emit("input", { selected: [firstOptionId] });
    }
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
      const firstOption = this.meta.options[0];
      const { id: firstOptionId } = firstOption;
      let selected = false;

      if (!this.isMulti && this.selected.length !== 1 && id === firstOptionId) {
        return true;
      }

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
