<template>
  <renderless-selector
    v-slot="{
      actions,
      isOpen,
      isClosed,
      selectedOptions,
      highlightedOption,
      options,
    }"
    @select-option="$emit('select-option', arguments[0])"
    @deselect-option="$emit('deselect-option', arguments[0])"
  >
    <div class="py-1 md:flex md:items-center">
      <!-- Select dropdown -->
      <div
        class="relative sm:inline-block w-60 mr-4"
        :id="`listbox-${selectorId}`"
        v-click-away="actions.close"
        :aria-labelledby="buttonId"
      >
        <selector-button
          :id="buttonId"
          :isOpen="isOpen"
          :display="selectedOptions[0] ? selectedOptions[0].display : ''"
          @toggle="toggle(actions)"
          @open="open(actions)"
          ref="button"
        />
        <selector-listbox
          :selectedOption="selectedOptions[0]"
          :isClosed="isClosed"
          ref="listBox"
          @highlight-next-option="highlightNextOption(actions)"
          @highlight-previous-option="highlightPreviousOption(actions)"
          @select-option="selectOption(highlightedOption.id, actions)"
          @close="close(actions)"
          v-slot="{ createItemId }"
        >
          <selector-list-item
            v-for="option in options"
            :id="createItemId(option.id)"
            :key="option.id"
            :optionId="option.id"
            :optionDisplay="option.display"
            :selected="isSelected(option, selectedOptions)"
            :isHighlighted="option === highlightedOption"
            :ref="option.id"
            @mouseenter="actions.highlightOption(option)"
            @mouseleave="actions.highlightOption(null)"
            @click="selectOption(option.id, actions)"
          />
        </selector-listbox>
      </div>
      <!-- Custom options -->
      <div class="md:flex w-auto pt-4 md:pt-0">
        <slot></slot>
      </div>
    </div>
  </renderless-selector>
</template>

<script>
import RenderlessSelector from "@/components/renderless/selector";
import { uid } from "@/mixins";
import SelectorButton from "./selector-button";
import SelectorListbox from "./selector-listbox";
import SelectorListItem from "./selector-list-item";

export default {
  name: "selector",
  mixins: [uid],
  props: {
    multiselect: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    selectorId() {
      return this.uid;
    },
    buttonId() {
      return `button-${this.selectorId}`;
    },
  },
  methods: {
    isSelected(option, selectedOptions) {
      let selected = false;

      selectedOptions.forEach((selectedOption) => {
        if (option === selectedOption) {
          selected = true;
        }
      });

      return selected;
    },
    selectOption(optionId, actions) {
      const { clearOptions, selectOption, close, toggleOption } = actions;
      const { multiselect } = this;
      
      if (multiselect) {
        toggleOption(optionId);
      } else {
        clearOptions();
        selectOption(optionId);
        close();
      }
    },
    scrollIntoView(optionId) {
      if (optionId) {
        const listItem = this.$refs[optionId][0];
        listItem.scrollIntoView();
      }
    },
    async close({ close }) {
      const { isClosed } = await close();
      if (isClosed) { 
        this.$refs.button.focus();
      }
    },
    async open({ open }) {
      const { selectedOption } = await open();
      this.$refs.listBox.focus();
      this.scrollIntoView(selectedOption?.id);
    },
    async toggle({ toggle }) {
      const { isOpen, selectedOption } = await toggle();
      if (isOpen) {
        this.$refs.listBox.focus();
        this.scrollIntoView(selectedOption?.id);
      } else {
        this.$refs.button.focus();
      }
    },
    async highlightNextOption({ highlightNextOption }) {
      const { highlightedOption } = await highlightNextOption();
      this.scrollIntoView(highlightedOption?.id);
    },
    async highlightPreviousOption({ highlightPreviousOption }) {
      const { highlightedOption } = await highlightPreviousOption();
      this.scrollIntoView(highlightedOption?.id);
    },
  },
  components: {
    RenderlessSelector,
    SelectorListItem,
    SelectorButton,
    SelectorListbox,
  },
};
</script>
