<template>
  <renderless-selector
    :selectorId="selectorId"
    v-slot="{ actions, isOpen, isClosed, selectedOption, highlightedOption, options }"
  >
    <div>
      <!-- Select dropdown -->
      <div
        class="relative sm:inline-block w-60 mr-4"
        :id="`listbox-${selectorId}`"
        v-click-away="actions.close"
        :aria-labelledby="buttonId"
      >
        <selector-button
          :id="buttonId"
          :selectorId="selectorId"
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
          @highlightNextOption="highlightNextOption(actions)"
          @highlightPreviousOption="highlightPreviousOption(actions)"
          @selectOption="actions.selectOption(highlightedOption.id)"
          @close="close(actions)"
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
            @mouseenter="highlightOption(actions, option)"
            @mouseleave="highlightOption(actions, null)"
            @click="actions.selectOption(option.id)"
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
     highlightOption({ highlightOption }, option) {
       highlightOption(option).then(({ highlightedOption }) => {
         this.scrollIntoView(highlightedOption?.id);
       })
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
