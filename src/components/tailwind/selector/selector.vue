<template>
  <div>
    <!-- Select dropdown -->
    <div
      class="relative sm:inline-block w-60 mr-4"
      :id="`listbox-${selectorId}`"
      v-click-away="close"
      :aria-labelledby="buttonId"
    >
      <selector-button
        :id="buttonId"
        :selectorId="selectorId"
        :isOpen="isOpen"
        :display="selectedOption ? selectedOption.display : ''"
        @toggle="toggle"
        @open="open"
        ref="button"
      />
      <selector-listbox
        :selectedOption="selectedOption"
        :isClosed="isClosed"
        ref="listBox"
        @highlightNextOption="highlightNextOption"
        @highlightPreviousOption="highlightPreviousOption"
        @selectOption="selectHighlightedOption"
        @close="close"
      >
        <selector-list-item
          v-for="option in selector.options"
          :id="`listbox-option-${selectorId}-${option.id}`"
          :key="option.id"
          :optionId="option.id"
          :optionDisplay="option.display"
          :selected="option === selectedOption"
          :isHighlighted="option === highlightedOption"
          :ref="option.id"
          @mouseenter.native="highlightedOption = option"
          @mouseleave.native="highlightedOption = null"
          @click.native="selectOption(option.id)"
        />
      </selector-listbox>
    </div>
    <!-- Custom options -->
    <div class="sm:inline-block w-full pt-4 md:w-auto md:pt-0">
      <slot></slot>
    </div>
  </div>
</template>

<script>
 import Vue from 'vue';
 import SelectorStore from '@/stores/selector';
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
   data() {
     return {
       selector: Vue.observable(new SelectorStore(this.selectorId)),
       isClosed: true,
       highlightedOption: null,
     };
   },
   provide() {
     return {
       selector: this.selector,
     };
   },
   computed: {
     buttonId() {
       return `button-${this.selectorId}`;
     },
     selectedOption() {
       return this.selector.selectedOption;
     },
     isOpen() {
       return !this.isClosed;
     },
   },
   methods: {
     close() {
       // conditionally call this otherwise
       // the button will refocus over and over again
       if(!this.isClosed) {
         this.isClosed = true;
         Vue.nextTick(() => {
           this.$refs.button.focus();
         });
       }
     },
     open() {
       this.isClosed = false;
       this.highlightedOption = this.selectedOption;
       Vue.nextTick(() => {
         this.$refs.listBox.focus();
         this.scrollIntoView(this.highlightedOption?.id);
       });
     },
     toggle() {
       if (this.isClosed) {
         this.open();
       } else {
         this.close();
       }
     },
     selectHighlightedOption() {
       this.selector.selectOption(this.highlightedOption.id);
       this.close();
     },
     selectOption(optionId) {
       this.selector.selectOption(optionId);
       this.close();
     },
     scrollIntoView(optionId) {
       const listItem = this.$refs[optionId][0];
       listItem.scrollIntoView();
     },
     highlightNextOption() {
       const nextOption = this.highlightedOption?.nextOption;
       if (nextOption) {
         this.highlightedOption = nextOption;
         this.scrollIntoView(this.highlightedOption.id);
       }
     },
     highlightPreviousOption() {
       const previousOption = this.highlightedOption?.previousOption;
       if (previousOption) {
         this.highlightedOption = previousOption;
         this.scrollIntoView(this.highlightedOption.id);
       }
     },
   },
   components: {
     SelectorListItem,
     SelectorButton,
     SelectorListbox,
   },
 }
</script>
