<template>
  <div class="mt-1 relative">
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      @click="toggle()"
    >
      <span class="block truncate">
        {{  selectedOption && selectedOption.display }}
      </span>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <!-- Heroicon name: selector -->
        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <div class="absolute mt-1 w-full rounded-md bg-white shadow-lg">
      <ul
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-item-3"
        class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        :class="{ hidden: closed }"
      >
        <selector-option
          v-for="option in options"
          :key="option.id"
          :option="option"
          :selected="option === selectedOption"
          @click="selectOption(option.id)"
        />
      </ul>
    </div>
    <slot></slot>
  </div>
</template>

<script>
 import SelectorOption from './selector-option';

 export default {
   name: 'selector',
   data() {
     return {
       selectedOption: null,
       options: [],
       closed: true,
     };
   },
   provide() {
     return {
       selector: this.selector,
     };
   },
   computed: {
     selector: function() {
       const { registerOption, selectOption, selectedOption } = this;
       return {
         registerOption,
         selectedOption,
         selectOption,
       };
     },
   },
   methods: {
     registerOption(option) {
       this.options.push(option);
     },
     close() {
       this.closed = true;
     },
     open() {
       this.closed = false;
     },
     toggle() {
       this.closed = !this.closed;
     },
     selectOption(optionId) {
       let option;
       for (var i = 0; i < this.options.length; i++) {
         const currentOption = this.options[i];
         if (currentOption.id === optionId) {
           option = currentOption;
           break;
         }
       }
       this.selectedOption = option;
       this.close();
     },
   },
   components: {
     SelectorOption,
   },
 }
</script>
