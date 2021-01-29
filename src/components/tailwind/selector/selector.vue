<template>
  <renderless-selector
    v-slot="{ actions, isOpen, isClosed, selectedOption, highlightedOption, options }"
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
          :display="selectedOption ? selectedOption.display : ''"
          @toggle="toggle(actions)"
          @open="open(actions)"
          ref="button"
        />
        <selector-listbox
          :selectedOption="selectedOption"
          :isClosed="isClosed"
          ref="listBox"
          @highlight-next-option="highlightNextOption(actions)"
          @highlight-previous-option="highlightPreviousOption(actions)"
          @select-option="actions.selectOption(highlightedOption.id)"
          @close="close(actions)"
          v-slot="{ createItemId }"
        >
          <selector-list-item
            v-for="option in options"
            :id="createItemId(option.id)"
            :key="option.id"
            :optionId="option.id"
            :optionDisplay="option.display"
            :selected="option === selectedOption"
            :isHighlighted="option === highlightedOption"
            :ref="option.id"
            @mouseenter="actions.highlightOption(option)"
            @mouseleave="actions.highlightOption(null)"
            @click="actions.selectOption(option.id)"
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
 import RenderlessSelector from '@/components/renderless/selector';
 import { uid } from '@/mixins';
 import SelectorButton from './selector-button';
 import SelectorListbox from './selector-listbox';
 import SelectorListItem from './selector-list-item';

 export default {
   name: 'selector',
   mixins: [uid],
   computed: {
     selectorId() {
       return this.uid
     },
     buttonId() {
       return `button-${this.selectorId}`;
     },
   },
   methods: {
     scrollIntoView(optionId) {
       if (optionId) {
         const listItem = this.$refs[optionId][0];
         listItem.scrollIntoView();
       }
     },
     close({ close }) {
       close().then(({ isClosed }) => {
         if (isClosed) {
           this.$refs.button.focus();
         }
       });
     },
     open({ open }) {
       open().then(({ selectedOption }) => {
         this.$refs.listBox.focus();
         this.scrollIntoView(selectedOption?.id);
       });
     },
     toggle({ toggle }) {
       toggle().then(({ isOpen, selectedOption }) => {
         if (isOpen) {
           this.$refs.listBox.focus();
           this.scrollIntoView(selectedOption?.id);
         } else {
           this.$refs.button.focus();
         }
       });
     },
     highlightNextOption({ highlightNextOption }) {
       highlightNextOption().then(({ highlightedOption }) => {
         this.scrollIntoView(highlightedOption?.id);
       });
     },
     highlightPreviousOption({ highlightPreviousOption }) {
       highlightPreviousOption().then(({ highlightedOption }) => {
         this.scrollIntoView(highlightedOption?.id);
       });
     },
   },
   components: {
     RenderlessSelector,
     SelectorListItem,
     SelectorButton,
     SelectorListbox,
   },
 }
</script>
