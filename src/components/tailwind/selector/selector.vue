<template>
  <div>
    <!-- Select dropdown -->
    <div
      class="relative sm:inline-block w-60 mr-4"
      :id="`listbox-selector-${selectorId}`"
      v-click-away="close"
    >
      <button
        type="button"
        aria-haspopup="listbox"
        :aria-expanded="open"
        class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @click.prevent.stop="toggle"
        @keydown.arrow-down.stop.prevent="open"
      >
        <span class="block truncate">
          {{  selector.selectedOption && selector.selectedOption.display }}
        </span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <!-- Heroicon name: selector -->
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>

      <div class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
        <ul
          tabindex="-1"
          role="listbox"
          :aria-activedescendant="selector.selectedOption ? `listbox-option-${selector.selectedOption.id}` : null"
          class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          :class="{ hidden: closed }"
          ref="listBox"
        >
          <selector-option
            v-for="option in selector.options"
            :id="`list-box-${selectorId}-${option.id}`"
            :key="option.id"
            :option="option"
            :selected="option === selector.selectedOption"
            @click.native="selectOption(option.id)"
          />
        </ul>
      </div>
    </div>
    <!-- Custom options -->
    <div class="sm:inline-block w-full pt-4 md:w-auto md:pt-0">
      <slot></slot>
    </div>
  </div>
</template>

<script>
 import Vue from 'vue';
 import SelectorOption from './selector-option';
 import SelectorStore from '@/stores/selector';

 export default {
   name: 'selector',
   inject: ['condition'],
   data() {
     const { condition } = this;
     return {
       selector: Vue.observable(new SelectorStore(condition.id)),
       closed: true,
       selectorId: condition.id,
     };
   },
   provide() {
     return {
       selector: this.selector,
     };
   },
   methods: {
     registerOption(option) {
       this.selector.registerOption(option);
     },
     close() {
       this.closed = true;
     },
     open() {
       this.closed = false;
       Vue.nextTick(() => {
         this.$refs.listBox.focus();
       });
     },
     toggle() {
       if (this.closed) {
         this.open();
       } else {
         this.close();
       }
     },
     selectOption(optionId) {
       this.selector.selectOption(optionId);
       this.close();
     },
   },
   components: {
     SelectorOption,
   },
 }
</script>
