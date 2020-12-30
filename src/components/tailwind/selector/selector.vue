<template>
  <renderless-selector
    :selectorId="selectorId"
    v-slot="{ close, open, toggle, isOpen, isClosed, selectedOption, highlightedOption, selectOption, selectHighlightedOption, options, highlightNextOption, highlightPreviousOption, highlightOption }"
  >
    <div>
      <!-- Select dropdown -->
      <div
        class="relative sm:inline-block w-60 mr-4"
        :id="`listbox-${selectorId}`"
        v-click-away="clickAway(close)"
        :aria-labelledby="buttonId"
      >
        <selector-button
          :id="buttonId"
          :selectorId="selectorId"
          :isOpen="isOpen"
          :display="selectedOption ? selectedOption.display : ''"
          @toggle="toggle(focusListbox, focusButton)"
          @open="open(focusListbox)"
          ref="button"
        />
        <selector-listbox
          :selectedOption="selectedOption"
          :isClosed="isClosed"
          ref="listBox"
          @highlightNextOption="highlightNextOption"
          @highlightPreviousOption="highlightPreviousOption"
          @selectOption="selectHighlightedOption"
          @close="close(focusButton)"
          v-slot="{ itemIdGenerator }"
        >
          <selector-list-item
            v-for="option in options"
            :id="itemIdGenerator(option.id)"
            :key="option.id"
            :optionId="option.id"
            :optionDisplay="option.display"
            :selected="option === selectedOption"
            :isHighlighted="option === highlightedOption"
            :ref="option.id"
            @mouseenter="highlightOption"
            @mouseleave="highlightOption(null)"
            @click="selectOption(option.id)"
          />
        </selector-listbox>
      </div>
      <!-- Custom options -->
      <div class="sm:inline-block w-full pt-4 md:w-auto md:pt-0">
        <slot></slot>
      </div>
    </div>
  </renderless-selector>
</template>

<script>
 import RenderlessSelector from '@/components/renderless/selector';
 import SelectorButton from './selector-button';
 import SelectorListbox from './selector-listbox';
 import SelectorListItem from './selector-list-item';

 export default {
   name: 'selector',
   props: {
     selectorId: {
       type: String,
       required: true,
     },
   },
   computed: {
     buttonId() {
       return `button-${this.selectorId}`;
     },
   },
   methods: {
     clickAway(close) {
       return () => close(this.focusButton);
     },
     scrollIntoView(optionId) {
       if (optionId) {
         const listItem = this.$refs[optionId][0];
         listItem.scrollIntoView();
       }
     },
     focusListbox() {
       this.$refs.listBox.focus();
       // how?
       // this.scrollIntoView(this.highlightedOption?.id);
     },
     focusButton() {
       this.$refs.button.focus();
     },
/*     highlightNextOption() {
       const option = this.$slots.default.highlightNextOption();
       this.scrollIntoView(option && option.id);
     },
     highlightPreviousOption() {
       const option = this.$slots.default.highlightPreviousOption();
       this.scrollIntoView(option && option.id);
     },*/
   },
   components: {
     RenderlessSelector,
     SelectorListItem,
     SelectorButton,
     SelectorListbox,
   },
 }
</script>
