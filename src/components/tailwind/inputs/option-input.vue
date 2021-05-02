<template>
  <selector @toggle-option="toggleOption" multiselect>
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
  data() {
    const { selected, meta } = this;
    const { options } = meta;
    return {
      selectedOptions: selected.length > 0 ? [...selected] : [options[0]],
    };
  },
  methods: {
    toggleOption() {

    },
    isSelected(id) {
      let selected = false;
      console.log(this.selectedOptions)
      this.selectedOptions.forEach(({ id: selectedId }) => {
        if (selectedId === id) {
          selected = true;
        }
      });

      return selected;
    },
  },
};
</script>
