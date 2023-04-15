<template>
  <renderless-selector
    v-slot="{ actions, isOpen, isClosed, selectedOptions, highlightedOption, options }"
    @select-option="$emit('select-option', $event)"
    @deselect-option="$emit('deselect-option', $event)"
  >
    <refine-flavor as="div" component="select.wrapper">
      <!-- Select dropdown -->
      <refine-flavor
        as="div"
        component="select"
        :class="innerClass"
        :id="`listbox-${selectorId}`"
        v-click-away="actions.close"
        :aria-labelledby="buttonId"
      >
        <multi-selector-button
          v-if="isMultiSelect"
          :id="buttonId"
          :isOpen="isOpen"
          :selectedOptions="selectedOptions"
          @toggle="toggle(actions)"
          @open="open(actions)"
          @deselect-option="deselectOption($event, actions)"
          ref="button"
        />
        <selector-button
          v-else
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
          @buffer-changed="(value) => updateBuffer(value, options, actions)"
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
            :isHighlighted="highlightedOption && option.id === highlightedOption.id"
            :ref="'opt-' + option.id"
            @mouseenter="actions.highlightOption(option)"
            @mouseleave="actions.highlightOption(null)"
            @selected="selectOption(option.id, actions)"
          />
        </selector-listbox>
      </refine-flavor>
      <!-- Custom options -->
      <refine-flavor as="div" component="customOptions.wrapper">
        <slot></slot>
      </refine-flavor>
    </refine-flavor>
  </renderless-selector>
</template>
<script>
import RenderlessSelector from '../../../components/renderless/selector';
import { uid } from '../../../mixins';
import SelectorButton from './selector-button';
import SelectorListbox from './selector-listbox';
import SelectorListItem from './selector-list-item';
import MultiSelectorButton from './multi-selector-button.vue';
import ClickAway from '../../../directives/click-away';
import { RefineFlavor } from '../../../components/base/query-builder/refine-flavor';

export default {
  name: 'selector',
  mixins: [uid],
  inject: ['builderModeActive'],
  props: {
    isMultiSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    innerClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['select-option', 'deselect-option'],
  computed: {
    selectorId() {
      return this.uid;
    },
    buttonId() {
      return `button-${this.selectorId}`;
    },
  },
  mounted() {
    if (this.builderModeActive) {
      this.$refs.button.$el.focus();
    }
  },
  directives: {
    clickAway: new ClickAway(),
  },
  methods: {
    updateBuffer(value, options, actions) {
      if (!value) {
        return;
      }
      const first = options.find((option) => {
        return option.display.toLowerCase().includes(value);
      });

      if (first) {
        actions.highlightOption(first);
        this.scrollIntoView(first.id);
      }
    },

    isSelected(option, selectedOptions) {
      let selected = false;

      selectedOptions.forEach((selectedOption) => {
        if (option.id === selectedOption.id) {
          selected = true;
        }
      });

      return selected;
    },
    deselectOption(optionId, { toggleOption }) {
      toggleOption(optionId);
    },
    async selectOption(optionId, actions) {
      const { clearOptions, selectOption, toggleOption } = actions;
      const { isMultiSelect } = this;

      if (isMultiSelect) {
        toggleOption(optionId);
      } else {
        clearOptions();
        selectOption(optionId);
        await this.close(actions);
      }
    },
    scrollIntoView(optionId) {
      if (optionId) {
        const listItem = this.$refs['opt-' + optionId][0].$el;
        listItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    },
    async close({ close }) {
      const { isClosed } = await close();
      if (isClosed) {
        this.$refs.button?.$el?.focus();
      }
    },
    async open({ open }) {
      const { selectedOption } = await open();
      this.scrollIntoView(selectedOption?.id);
    },
    async toggle({ toggle }) {
      const { isOpen, selectedOption } = await toggle();

      if (isOpen) {
        this.scrollIntoView(selectedOption?.id);
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
    MultiSelectorButton,
    RenderlessSelector,
    SelectorListItem,
    SelectorButton,
    SelectorListbox,
    RefineFlavor,
  },
};
</script>
