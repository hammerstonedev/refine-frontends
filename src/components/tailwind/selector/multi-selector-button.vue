<template>
  <div
    :id="id"
    aria-haspopup="listbox"
    :aria-expanded="isOpen"
    class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm space-y-1"
    ref="button"
    @click.prevent="$emit('toggle')"
    @keydown.enter.stop.prevent="$emit('open')"
    @keydown.arrow-down.stop.prevent="$emit('open')"
    tabindex="0"
  >
    <span 
      class="block truncate text-gray-300"
      v-if="selectedOptions.length === 0"
    >
      Choose an option
    </span>
    <span 
      v-else
      v-for="{ id, display } in selectedOptions"
      class="inline-flex p-1 border border-gray-300 rounded mr-1"
      :key="id"
    >
      {{ display }}
      <span 
        class="text-gray-500 ml-1 flex items-center cursor-pointer"
        @click.prevent="$emit('deselect-option', id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </span>
    </span>
    <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
      <!-- Heroicon name: selector -->
      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </span>
  </div>
</template>

<script>
 export default {
   name: 'multi-selector-button',
   props: {
     id: {
       type: String,
       required: true,
     },
     isOpen: {
       type: Boolean,
       required: true,
     },
     selectedOptions: {
         type: Array,
         required: true,
     },
   },
   methods: {
     focus: function() {
       this.$refs.button.focus();
     },
   },
 }
</script>
